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

package com.momo.shortlink.project.dao.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

/**
 * 短链接访问统计 RabbitMQ 消费记录持久层
 */
public interface ShortLinkStatsConsumeMapper {

    /**
     * 原子写入消息 ID；唯一键冲突返回 0，用于阻止重复投递再次累计统计数据。
     *
     * @param messageId RabbitMQ 业务消息唯一标识
     * @return 1 表示首次消费，0 表示消息已经成功消费
     */
    @Insert("INSERT IGNORE INTO t_link_stats_consume (message_id, create_time) VALUES (#{messageId}, NOW())")
    int insertIfAbsent(@Param("messageId") String messageId);
}
