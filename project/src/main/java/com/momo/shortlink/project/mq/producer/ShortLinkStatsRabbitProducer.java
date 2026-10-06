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

package com.momo.shortlink.project.mq.producer;

import com.alibaba.fastjson2.JSON;
import com.momo.shortlink.project.dto.biz.ShortLinkStatsRecordDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.MessageDeliveryMode;
import org.springframework.amqp.core.ReturnedMessage;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_EXCHANGE;
import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_ROUTING_KEY;

/**
 * 短链接访问统计 RabbitMQ 可靠消息生产者
 */
@Slf4j
@Component
public class ShortLinkStatsRabbitProducer {

    private final RabbitTemplate rabbitTemplate;
    private final int maxAttempts;
    private final long retryInterval;
    private final long confirmTimeout;

    /**
     * 创建带有限重试与 Confirm 超时参数的访问统计生产者。
     */
    public ShortLinkStatsRabbitProducer(
            RabbitTemplate rabbitTemplate,
            @Value("${short-link.stats.rabbit.publisher.max-attempts:3}") int maxAttempts,
            @Value("${short-link.stats.rabbit.publisher.retry-interval:500}") long retryInterval,
            @Value("${short-link.stats.rabbit.publisher.confirm-timeout:5000}") long confirmTimeout) {
        this.rabbitTemplate = rabbitTemplate;
        this.maxAttempts = maxAttempts;
        this.retryInterval = retryInterval;
        this.confirmTimeout = confirmTimeout;
    }

    /**
     * 发送持久化访问统计消息，并同步等待 Broker 确认与路由结果。
     *
     * @param statsRecord 短链接访问统计记录
     * @return 是否已收到 Broker ACK 且消息成功路由
     */
    public boolean send(ShortLinkStatsRecordDTO statsRecord) {
        // 同一次业务发送的所有物理重试复用消息 ID，消费者可据此拦截重复投递。
        String messageId = UUID.randomUUID().toString();
        Throwable lastException = null;
        String lastFailureReason = null;
        int actualMaxAttempts = Math.max(1, maxAttempts);
        for (int attempt = 1; attempt <= actualMaxAttempts; attempt++) {
            CorrelationData correlationData = new CorrelationData(messageId + "-" + attempt);
            try {
                rabbitTemplate.convertAndSend(
                        SHORT_LINK_STATS_EXCHANGE,
                        SHORT_LINK_STATS_ROUTING_KEY,
                        statsRecord,
                        message -> {
                            // 持久消息配合 durable 交换机与队列，Broker 重启后可恢复未消费消息。
                            message.getMessageProperties().setDeliveryMode(MessageDeliveryMode.PERSISTENT);
                            message.getMessageProperties().setMessageId(messageId);
                            return message;
                        },
                        correlationData);
                CorrelationData.Confirm confirm = correlationData.getFuture().get(confirmTimeout, TimeUnit.MILLISECONDS);
                ReturnedMessage returnedMessage = correlationData.getReturned();
                if (returnedMessage != null) {
                    lastFailureReason = String.format(
                            "消息不可路由，replyCode=%s，replyText=%s",
                            returnedMessage.getReplyCode(),
                            returnedMessage.getReplyText());
                    log.warn("短链接访问统计消息第 {} 次发送被退回，messageId：{}，{}", attempt, messageId, lastFailureReason);
                } else if (confirm.isAck()) {
                    return true;
                } else {
                    lastFailureReason = "Broker NACK：" + confirm.getReason();
                    log.warn("短链接访问统计消息第 {} 次发送未确认，messageId：{}，原因：{}", attempt, messageId, confirm.getReason());
                }
            } catch (InterruptedException ex) {
                // 恢复中断标记并立即结束重试，避免吞掉线程关闭信号。
                Thread.currentThread().interrupt();
                lastException = ex;
                lastFailureReason = "等待发送确认时线程被中断";
                break;
            } catch (Exception ex) {
                // Broker 不可用、确认超时及客户端异常均进入同一有限重试流程。
                lastException = ex;
                lastFailureReason = ex.getMessage();
                log.warn("短链接访问统计消息第 {} 次发送异常，messageId：{}", attempt, messageId, ex);
            }
            if (attempt < actualMaxAttempts && !pauseBeforeRetry(messageId)) {
                lastFailureReason = "发送重试等待被中断";
                break;
            }
        }
        // 最终失败采用结构化错误日志降级，便于日志平台告警和人工重放，同时不阻断短链接跳转。
        log.error(
                "短链接访问统计消息发送失败，已执行降级记录，messageId：{}，失败原因：{}，statsRecord：{}",
                messageId,
                lastFailureReason,
                JSON.toJSONString(statsRecord),
                lastException);
        return false;
    }

    /**
     * 在两次发送之间执行固定间隔退避。
     */
    private boolean pauseBeforeRetry(String messageId) {
        try {
            TimeUnit.MILLISECONDS.sleep(Math.max(0L, retryInterval));
            return true;
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            log.warn("短链接访问统计消息重试等待被中断，messageId：{}", messageId, ex);
            return false;
        }
    }
}
