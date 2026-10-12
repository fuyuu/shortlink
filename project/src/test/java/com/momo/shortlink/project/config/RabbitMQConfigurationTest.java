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

import com.momo.shortlink.project.initialize.ShortLinkStatsStreamInitializeTask;
import com.rabbitmq.client.Channel;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.retry.MessageRecoverer;
import org.springframework.aop.ProxyMethodInvocation;
import org.springframework.boot.autoconfigure.amqp.RabbitProperties;
import org.springframework.boot.autoconfigure.amqp.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.retry.support.RetryTemplate;

import java.util.concurrent.atomic.AtomicInteger;

import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_DLQ_ROUTING_KEY;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_DLX;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_EXCHANGE;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_QUEUE;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_ROUTING_KEY;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class RabbitMQConfigurationTest {

    private final RabbitMQConfiguration configuration = new RabbitMQConfiguration();

    @Test
    void shouldDeclareDurableMainAndDeadLetterTopology() {
        // 主交换机、主队列和死信拓扑均需持久化，Broker 重启后仍能恢复。
        DirectExchange exchange = configuration.shortLinkStatsExchange();
        Queue queue = configuration.shortLinkStatsQueue();
        DirectExchange deadLetterExchange = configuration.shortLinkStatsDeadLetterExchange();
        Queue deadLetterQueue = configuration.shortLinkStatsDeadLetterQueue();
        Binding binding = configuration.shortLinkStatsBinding(queue, exchange);
        Binding deadLetterBinding = configuration.shortLinkStatsDeadLetterBinding(deadLetterQueue, deadLetterExchange);

        assertTrue(exchange.isDurable());
        assertFalse(exchange.isAutoDelete());
        assertTrue(queue.isDurable());
        assertFalse(queue.isAutoDelete());
        assertFalse(queue.isExclusive());
        assertTrue(deadLetterExchange.isDurable());
        assertFalse(deadLetterExchange.isAutoDelete());
        assertTrue(deadLetterQueue.isDurable());
        assertEquals(SHORT_LINK_STATS_EXCHANGE, binding.getExchange());
        assertEquals(SHORT_LINK_STATS_QUEUE, binding.getDestination());
        assertEquals(SHORT_LINK_STATS_ROUTING_KEY, binding.getRoutingKey());
        assertEquals(SHORT_LINK_STATS_DLX, deadLetterBinding.getExchange());
        assertEquals(SHORT_LINK_STATS_DLQ_ROUTING_KEY, deadLetterBinding.getRoutingKey());
        assertEquals(SHORT_LINK_STATS_DLX, queue.getArguments().get("x-dead-letter-exchange"));
        assertEquals(SHORT_LINK_STATS_DLQ_ROUTING_KEY, queue.getArguments().get("x-dead-letter-routing-key"));
    }

    @Test
    void shouldRetryConsumerThreeTimesBeforeRecovery() {
        // 固定重试模板必须严格执行配置的最大次数，避免无限重回队列形成热循环。
        RetryTemplate retryTemplate = configuration.shortLinkStatsConsumerRetryTemplate(3, 0L);
        AtomicInteger attempts = new AtomicInteger();

        assertThrows(IllegalStateException.class, () -> retryTemplate.execute(context -> {
            attempts.incrementAndGet();
            throw new IllegalStateException("模拟统计落库失败");
        }));
        assertEquals(3, attempts.get());
    }

    @Test
    void shouldForceManualRejectAfterConsumerRetriesAreExhausted() {
        // 手动 ACK 模式下必须设置 rejectManual=true，才能真正 basicReject 并通过 DLX 进入死信队列。
        MessageRecoverer recoverer = configuration.shortLinkStatsMessageRecoverer();

        AmqpRejectAndDontRequeueException exception = assertThrows(
                AmqpRejectAndDontRequeueException.class,
                () -> recoverer.recover(mock(Message.class), new IllegalStateException("模拟重试耗尽")));

        assertTrue(exception.isRejectManual());
    }

    @Test
    void shouldRetryListenerThreeTimesThenRequestManualReject() throws Throwable {
        // 验证实际 AdviceChain 在三次业务失败后调用手动拒绝恢复器，而非无限重新入主队列。
        RetryTemplate retryTemplate = configuration.shortLinkStatsConsumerRetryTemplate(3, 0L);
        MessageRecoverer recoverer = configuration.shortLinkStatsMessageRecoverer();
        org.springframework.retry.interceptor.RetryOperationsInterceptor interceptor =
                configuration.shortLinkStatsRetryInterceptor(retryTemplate, recoverer);
        ProxyMethodInvocation invocation = mock(ProxyMethodInvocation.class);
        Message message = mock(Message.class);
        IllegalStateException failure = new IllegalStateException("模拟统计落库失败");
        when(invocation.getMethod()).thenReturn(
                ListenerInvocation.class.getMethod("invoke", Channel.class, Message.class));
        when(invocation.getArguments()).thenReturn(new Object[]{mock(Channel.class), message});
        when(invocation.invocableClone()).thenReturn(invocation);
        when(invocation.proceed()).thenThrow(failure);

        AmqpRejectAndDontRequeueException exception = assertThrows(
                AmqpRejectAndDontRequeueException.class,
                () -> interceptor.invoke(invocation));

        verify(invocation, times(3)).proceed();
        assertTrue(exception.isRejectManual());
    }

    @Test
    void shouldCreateBoundedPublisherExecutor() {
        // 发布确认放入独立有界线程池，避免 Broker 故障阻塞短链接 302 请求线程。
        ThreadPoolTaskExecutor executor = configuration.shortLinkStatsPublisherExecutor(2, 4, 100, 10);

        assertEquals(2, executor.getCorePoolSize());
        assertEquals(4, executor.getMaxPoolSize());
        assertEquals(100, executor.getQueueCapacity());
    }

    @Test
    void shouldCreateRabbitTopologyWithoutBeanAmbiguity() {
        // 仅装配本功能配置并提供 mock 基础设施，验证同类型主/死信 Bean 不会产生注入歧义。
        new ApplicationContextRunner()
                .withBean(ConnectionFactory.class, () -> mock(ConnectionFactory.class))
                .withBean(
                        SimpleRabbitListenerContainerFactoryConfigurer.class,
                        () -> new SimpleRabbitListenerContainerFactoryConfigurer(new RabbitProperties()))
                .withUserConfiguration(RabbitMQConfiguration.class)
                .run(context -> {
                    assertTrue(context.isRunning());
                    assertTrue(context.getStartupFailure() == null);
                    assertTrue(context.containsBean("shortLinkStatsBinding"));
                    assertTrue(context.containsBean("shortLinkStatsDeadLetterBinding"));
                });
    }

    @Test
    void shouldKeepDeprecatedRedisStreamDisabledByDefault() {
        // 未显式开启回滚开关时，旧监听容器和旧消费组初始化器都不应注册。
        new ApplicationContextRunner()
                .withUserConfiguration(RedisStreamConfiguration.class, ShortLinkStatsStreamInitializeTask.class)
                .run(context -> {
                    assertTrue(context.getStartupFailure() == null);
                    assertTrue(context.getBeansOfType(RedisStreamConfiguration.class).isEmpty());
                    assertTrue(context.getBeansOfType(ShortLinkStatsStreamInitializeTask.class).isEmpty());
                });
    }

    /**
     * 模拟 Spring AMQP 监听方法签名，供无 Broker 的 AdviceChain 测试提取原始消息。
     */
    private interface ListenerInvocation {

        void invoke(Channel channel, Message message);
    }
}
