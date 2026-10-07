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

import com.momo.shortlink.project.dao.mapper.ShortLinkStatsConsumeMapper;
import com.momo.shortlink.project.dto.biz.ShortLinkStatsRecordDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 短链接访问统计 RabbitMQ 事务消费服务
 */
@Service
@RequiredArgsConstructor
public class ShortLinkStatsConsumeService {

    private final ShortLinkStatsConsumeMapper shortLinkStatsConsumeMapper;
    private final ShortLinkStatsSaveConsumer shortLinkStatsSaveConsumer;

    /**
     * 在同一数据库事务内登记消息 ID 并保存统计，消除“统计已提交但幂等标记未写入”的重复窗口。
     *
     * @param messageId RabbitMQ 业务消息唯一标识
     * @param statsRecord 短链接访问统计记录
     * @return true 表示本次完成首次落库，false 表示已提交过相同消息
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean saveIfAbsent(String messageId, ShortLinkStatsRecordDTO statsRecord) {
        if (shortLinkStatsConsumeMapper.insertIfAbsent(messageId) == 0) {
            // 唯一键已存在只可能来自已提交事务，当前重复消息无需再次执行非幂等统计累加。
            return false;
        }
        shortLinkStatsSaveConsumer.actualSaveShortLinkStats(statsRecord);
        return true;
    }
}
