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

package com.momo.shortlink.project.mq.consumer;

import com.momo.shortlink.project.common.convention.exception.ServiceException;
import com.momo.shortlink.project.dto.biz.ShortLinkStatsRecordDTO;
import com.rabbitmq.client.Channel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;

import static com.momo.shortlink.project.common.constant.RabbitMQConstant.SHORT_LINK_STATS_QUEUE;

/**
 * 短链接访问统计 RabbitMQ 消费者
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ShortLinkStatsRabbitConsumer {

    private final ShortLinkStatsConsumeService shortLinkStatsConsumeService;

    /**
     * 消费访问统计消息；事务提交或确认重复消息后手动 ACK，异常则交给监听容器有限重试。
     */
    @RabbitListener(
            queues = SHORT_LINK_STATS_QUEUE,
            containerFactory = "shortLinkStatsRabbitListenerContainerFactory")
    public void onMessage(
            ShortLinkStatsRecordDTO statsRecord,
            Message message,
            Channel channel) throws IOException {
        String messageId = message.getMessageProperties().getMessageId();
        if (!StringUtils.hasText(messageId)) {
            // 缺少稳定消息 ID 时无法通过数据库唯一键去重，重试耗尽后必须进入死信队列。
            throw new ServiceException("RabbitMQ 短链接访问统计消息缺少 messageId");
        }
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        // 将 messageId 放入 MDC，后续该线程内所有 SLF4J 日志（含 MyBatis SQL）自动携带此前缀，
        // 方便在多消费者并发时区分每条消息的事务 SQL 链路。
        MDC.put("statsMsg", messageId != null ? messageId.substring(0, Math.min(8, messageId.length())) : "????????");
        try {
            boolean firstConsumption = shortLinkStatsConsumeService.saveIfAbsent(messageId, statsRecord);
            if (!firstConsumption) {
                // Confirm 超时重发或 ACK 丢失都可能产生重复消息，数据库记录命中后安全跳过统计累加。
                log.info("忽略已成功消费的短链接访问统计重复消息，messageId：{}", messageId);
            }
        } catch (RuntimeException ex) {
            log.error("RabbitMQ 短链接访问统计消息消费失败，messageId：{}", messageId, ex);
            // 抛给 RetryInterceptor，最多尝试配置次数；耗尽后 basicReject(false) 并转入 DLQ。
            throw ex;
        } finally {
            MDC.remove("statsMsg");
        }
        // 只有数据库事务已提交（或数据库确认重复）后才 ACK；ACK 失败重投时仍由数据库唯一键兜底。
        channel.basicAck(deliveryTag, false);
    }
}
