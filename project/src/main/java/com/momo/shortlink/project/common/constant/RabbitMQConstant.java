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

package com.momo.shortlink.project.common.constant;

/**
 * 短链接访问统计 RabbitMQ 常量
 */
public final class RabbitMQConstant {

    /**
     * 访问统计主交换机
     */
    public static final String SHORT_LINK_STATS_EXCHANGE = "short-link.stats.exchange";

    /**
     * 访问统计主队列
     */
    public static final String SHORT_LINK_STATS_QUEUE = "short-link.stats.queue";

    /**
     * 访问统计主路由键
     */
    public static final String SHORT_LINK_STATS_ROUTING_KEY = "short-link.stats.save";

    /**
     * 访问统计死信交换机
     */
    public static final String SHORT_LINK_STATS_DLX = "short-link.stats.dlx";

    /**
     * 访问统计死信队列
     */
    public static final String SHORT_LINK_STATS_DLQ = "short-link.stats.dlq";

    /**
     * 访问统计死信路由键
     */
    public static final String SHORT_LINK_STATS_DLQ_ROUTING_KEY = "short-link.stats.dead";

    /**
     * 常量类不允许实例化。
     */
    private RabbitMQConstant() {
    }
}
