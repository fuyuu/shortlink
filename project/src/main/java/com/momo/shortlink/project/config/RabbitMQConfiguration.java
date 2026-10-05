/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.momo.shortlink.project.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.rabbit.config.RetryInterceptorBuilder;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.RabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.retry.MessageRecoverer;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.amqp.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.interceptor.RetryOperationsInterceptor;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;

import java.util.concurrent.ThreadPoolExecutor;

import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_DLQ;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_DLQ_ROUTING_KEY;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_DLX;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_EXCHANGE;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_QUEUE;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_ROUTING_KEY;

/**
 * 短链接访问统计 RabbitMQ 可靠消息配置
 */
@Slf4j
@Configuration
public class RabbitMQConfiguration {

    /**
     * 声明持久化主交换机，Broker 重启后仍保留交换机元数据。
     */
    @Bean
    public DirectExchange shortLinkStatsExchange() {
        return new DirectExchange(SHORT_LINK_STATS_EXCHANGE, true, false);
    }

    /**
     * 声明持久化主队列，并把最终消费失败的消息路由到死信交换机。
     */
    @Bean
    public Queue shortLinkStatsQueue() {
        return QueueBuilder.durable(SHORT_LINK_STATS_QUEUE)
                .deadLetterExchange(SHORT_LINK_STATS_DLX)
                .deadLetterRoutingKey(SHORT_LINK_STATS_DLQ_ROUTING_KEY)
                .build();
    }

    /**
     * 将访问统计主队列绑定到主交换机。
     */
    @Bean
    public Binding shortLinkStatsBinding(
            @Qualifier("shortLinkStatsQueue") Queue shortLinkStatsQueue,
            @Qualifier("shortLinkStatsExchange") DirectExchange shortLinkStatsExchange) {
        return BindingBuilder.bind(shortLinkStatsQueue)
                .to(shortLinkStatsExchange)
                .with(SHORT_LINK_STATS_ROUTING_KEY);
    }

    /**
     * 声明持久化死信交换机，用于隔离超过最大重试次数的异常消息。
     */
    @Bean
    public DirectExchange shortLinkStatsDeadLetterExchange() {
        return new DirectExchange(SHORT_LINK_STATS_DLX, true, false);
    }

    /**
     * 声明持久化死信队列，异常消息保留在此队列等待人工检查或后续回放。
     */
    @Bean
    public Queue shortLinkStatsDeadLetterQueue() {
        return QueueBuilder.durable(SHORT_LINK_STATS_DLQ).build();
    }

    /**
     * 将死信队列绑定到死信交换机。
     */
    @Bean
    public Binding shortLinkStatsDeadLetterBinding(
            @Qualifier("shortLinkStatsDeadLetterQueue") Queue shortLinkStatsDeadLetterQueue,
            @Qualifier("shortLinkStatsDeadLetterExchange") DirectExchange shortLinkStatsDeadLetterExchange) {
        return BindingBuilder.bind(shortLinkStatsDeadLetterQueue)
                .to(shortLinkStatsDeadLetterExchange)
                .with(SHORT_LINK_STATS_DLQ_ROUTING_KEY);
    }

    /**
     * 使用 JSON 序列化访问统计 DTO，避免 Java 原生序列化带来的兼容和安全问题。
     */
    @Bean
    public Jackson2JsonMessageConverter rabbitMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    /**
     * 创建支持 Publisher Confirm 与 Return 回调的 RabbitTemplate。
     */
    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            @Qualifier("rabbitMessageConverter") Jackson2JsonMessageConverter rabbitMessageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(rabbitMessageConverter);
        // mandatory=true 时，不可路由消息会触发 Return 回调而不会被交换机静默丢弃。
        rabbitTemplate.setMandatory(true);
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (!ack) {
                String correlationId = correlationData == null ? null : correlationData.getId();
                log.error("短链接访问统计消息收到 Broker NACK，correlationId：{}，原因：{}", correlationId, cause);
            }
        });
        rabbitTemplate.setReturnsCallback(returned -> {
                    log.error(
                            "短链接访问统计消息路由失败，replyCode：{}，replyText：{}，exchange：{}，routingKey：{}",
                            returned.getReplyCode(),
                            returned.getReplyText(),
                            returned.getExchange(),
                            returned.getRoutingKey());
                    log.error("短链接访问统计消息路由失败，message：{}", returned.getMessage());
                }
        );
        return rabbitTemplate;
    }

    /**
     * 创建消费者固定间隔重试模板，最大尝试次数包含首次消费。
     */
    @Bean("shortLinkStatsConsumerRetryTemplate")
    public RetryTemplate shortLinkStatsConsumerRetryTemplate(
            @Value("${short-link.stats.rabbit.consumer.max-attempts:3}") int maxAttempts,
            @Value("${short-link.stats.rabbit.consumer.retry-interval:1000}") long retryInterval) {
        RetryTemplate retryTemplate = new RetryTemplate();
        retryTemplate.setRetryPolicy(new SimpleRetryPolicy(maxAttempts));
        FixedBackOffPolicy backOffPolicy = new FixedBackOffPolicy();
        backOffPolicy.setBackOffPeriod(retryInterval);
        retryTemplate.setBackOffPolicy(backOffPolicy);
        return retryTemplate;
    }

    /**
     * 创建手动 ACK 专用的重试耗尽处理器，显式要求容器拒绝消息且不重新入主队列。
     */
    @Bean
    public MessageRecoverer shortLinkStatsMessageRecoverer() {
        return (message, cause) -> {
            // rejectManual=true 才能让手动 ACK 容器执行 basicReject(false)，随后由主队列 DLX 转入死信队列。
            throw new AmqpRejectAndDontRequeueException(
                    "短链接访问统计消息消费重试耗尽，拒绝消息并进入死信队列",
                    true,
                    cause);
        };
    }

    /**
     * 重试耗尽后拒绝原消息且不重新入主队列，由主队列的 DLX 参数转入死信队列。
     */
    @Bean
    public RetryOperationsInterceptor shortLinkStatsRetryInterceptor(
            @Qualifier("shortLinkStatsConsumerRetryTemplate") RetryTemplate retryTemplate,
            @Qualifier("shortLinkStatsMessageRecoverer") MessageRecoverer messageRecoverer) {
        return RetryInterceptorBuilder.stateless()
                .retryOperations(retryTemplate)
                .recoverer(messageRecoverer)
                .build();
    }

    /**
     * 创建访问统计发布专用有界线程池，使 Publisher Confirm 等待与重试不占用 302 请求线程。
     */
    @Bean("shortLinkStatsPublisherExecutor")
    public ThreadPoolTaskExecutor shortLinkStatsPublisherExecutor(
            @Value("${short-link.stats.rabbit.publisher.executor.core-size:2}") int coreSize,
            @Value("${short-link.stats.rabbit.publisher.executor.max-size:4}") int maxSize,
            @Value("${short-link.stats.rabbit.publisher.executor.queue-capacity:1000}") int queueCapacity,
            @Value("${short-link.stats.rabbit.publisher.executor.shutdown-wait-seconds:20}") int shutdownWaitSeconds) {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(coreSize);
        executor.setMaxPoolSize(maxSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setThreadNamePrefix("short-link-stats-publisher-");
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(shutdownWaitSeconds);
        // 有界队列满载时明确拒绝，由调度器记录完整消息作为降级凭据，避免无界内存增长。
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.AbortPolicy());
        return executor;
    }

    /**
     * 创建访问统计专用监听容器，采用手动 ACK 并限制预取量与并发度。
     */
    @Bean("shortLinkStatsRabbitListenerContainerFactory")
    public RabbitListenerContainerFactory<SimpleMessageListenerContainer> shortLinkStatsRabbitListenerContainerFactory(
            SimpleRabbitListenerContainerFactoryConfigurer configurer,
            ConnectionFactory connectionFactory,
            @Qualifier("rabbitMessageConverter") Jackson2JsonMessageConverter rabbitMessageConverter,
            @Qualifier("shortLinkStatsRetryInterceptor") RetryOperationsInterceptor shortLinkStatsRetryInterceptor,
            @Value("${short-link.stats.rabbit.consumer.prefetch:50}") int prefetch,
            @Value("${short-link.stats.rabbit.consumer.concurrency:2}") int concurrency,
            @Value("${short-link.stats.rabbit.consumer.max-concurrency:4}") int maxConcurrency) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        configurer.configure(factory, connectionFactory);
        factory.setMessageConverter(rabbitMessageConverter);
        factory.setAcknowledgeMode(AcknowledgeMode.MANUAL);
        factory.setDefaultRequeueRejected(false);
        factory.setPrefetchCount(prefetch);
        factory.setConcurrentConsumers(concurrency);
        factory.setMaxConcurrentConsumers(maxConcurrency);
        factory.setAdviceChain(shortLinkStatsRetryInterceptor);
        return factory;
    }
}
