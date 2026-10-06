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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.core.task.TaskRejectedException;
import org.springframework.stereotype.Component;

/**
 * 短链接访问统计 RabbitMQ 异步发布调度器
 */
@Slf4j
@Component
public class ShortLinkStatsRabbitDispatcher {

    private final TaskExecutor publisherExecutor;
    private final ShortLinkStatsRabbitProducer shortLinkStatsRabbitProducer;

    /**
     * 注入专用发布线程池和可靠消息生产者。
     */
    public ShortLinkStatsRabbitDispatcher(
            @Qualifier("shortLinkStatsPublisherExecutor") TaskExecutor publisherExecutor,
            ShortLinkStatsRabbitProducer shortLinkStatsRabbitProducer) {
        this.publisherExecutor = publisherExecutor;
        this.shortLinkStatsRabbitProducer = shortLinkStatsRabbitProducer;
    }

    /**
     * 将 Publisher Confirm 与有限重试提交到专用线程池，保证 302 跳转线程不等待 Broker。
     *
     * @param statsRecord 短链接访问统计记录
     */
    public void send(ShortLinkStatsRecordDTO statsRecord) {
        try {
            publisherExecutor.execute(() -> shortLinkStatsRabbitProducer.send(statsRecord));
        } catch (TaskRejectedException ex) {
            // 线程池满载时保留完整业务数据到错误日志，供告警平台采集和人工重放。
            log.error(
                    "短链接访问统计发布线程池已满，执行降级记录，statsRecord：{}",
                    JSON.toJSONString(statsRecord),
                    ex);
        }
    }
}
