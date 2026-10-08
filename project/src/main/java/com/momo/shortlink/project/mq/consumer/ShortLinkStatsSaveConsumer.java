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

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.Week;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.momo.shortlink.project.common.convention.exception.ServiceException;
import com.momo.shortlink.project.dao.entity.LinkAccessLogsDO;
import com.momo.shortlink.project.dao.entity.LinkAccessStatsDO;
import com.momo.shortlink.project.dao.entity.LinkBrowserStatsDO;
import com.momo.shortlink.project.dao.entity.LinkDeviceStatsDO;
import com.momo.shortlink.project.dao.entity.LinkLocaleStatsDO;
import com.momo.shortlink.project.dao.entity.LinkNetworkStatsDO;
import com.momo.shortlink.project.dao.entity.LinkOsStatsDO;
import com.momo.shortlink.project.dao.entity.LinkStatsTodayDO;
import com.momo.shortlink.project.dao.entity.ShortLinkGotoDO;
import com.momo.shortlink.project.dao.mapper.LinkAccessLogsMapper;
import com.momo.shortlink.project.dao.mapper.LinkAccessStatsMapper;
import com.momo.shortlink.project.dao.mapper.LinkBrowserStatsMapper;
import com.momo.shortlink.project.dao.mapper.LinkDeviceStatsMapper;
import com.momo.shortlink.project.dao.mapper.LinkLocaleStatsMapper;
import com.momo.shortlink.project.dao.mapper.LinkNetworkStatsMapper;
import com.momo.shortlink.project.dao.mapper.LinkOsStatsMapper;
import com.momo.shortlink.project.dao.mapper.LinkStatsTodayMapper;
import com.momo.shortlink.project.dao.mapper.ShortLinkGotoMapper;
import com.momo.shortlink.project.dao.mapper.ShortLinkMapper;
import com.momo.shortlink.project.dto.biz.ShortLinkStatsRecordDTO;
import com.momo.shortlink.project.mq.idempotent.MessageQueueIdempotentHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RReadWriteLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.RecordId;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import static com.momo.shortlink.project.common.constant.RedisKeyConstant.LOCK_GID_UPDATE_KEY;
import static com.momo.shortlink.project.common.constant.ShortLinkConstant.AMAP_REMOTE_URL;

/**
 * 短链接监控状态保存处理器，保留旧 Redis Stream 消费入口并复用统计落库逻辑
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ShortLinkStatsSaveConsumer implements StreamListener<String, MapRecord<String, String, String>> {

    private final ShortLinkMapper shortLinkMapper;
    private final ShortLinkGotoMapper shortLinkGotoMapper;
    private final RedissonClient redissonClient;
    private final LinkAccessStatsMapper linkAccessStatsMapper;
    private final LinkLocaleStatsMapper linkLocaleStatsMapper;
    private final LinkOsStatsMapper linkOsStatsMapper;
    private final LinkBrowserStatsMapper linkBrowserStatsMapper;
    private final LinkAccessLogsMapper linkAccessLogsMapper;
    private final LinkDeviceStatsMapper linkDeviceStatsMapper;
    private final LinkNetworkStatsMapper linkNetworkStatsMapper;
    private final LinkStatsTodayMapper linkStatsTodayMapper;
    private final StringRedisTemplate stringRedisTemplate;
    private final MessageQueueIdempotentHandler messageQueueIdempotentHandler;

    @Value("${short-link.stats.locale.amap-key}")
    private String statsLocaleAmapKey;

    @Value("${short-link.stats.locale.enable:true}")
    private boolean statsLocaleEnable;

    /**
     * IP → 地理位置本地缓存。
     * <p>
     * 压测场景下所有请求来自同一 IP（如 127.0.0.1），无缓存时每条统计消息都打一次高德 API，
     * 免费 key 的 QPS 限额（通常 50~300）秒被突破后触发限流，HTTP 调用阻塞最多等待超时时间
     * （原 5s），而该调用又卡在数据库事务内部 → 连接池迅速耗尽 → 雪崩。
     * <p>
     * 缓存命中后同 IP 在 TTL 内零高德调用，彻底消除限流风险。
     */
    private final Cache<String, LocaleResult> localeCache = CacheBuilder.newBuilder()
            .maximumSize(10000)
            .expireAfterWrite(10, TimeUnit.MINUTES)
            .build();

    /**
     * 高德 IP 定位结果缓存值对象
     */
    @lombok.Data
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class LocaleResult {
        private String province;
        private String city;
        private String adcode;
        /** true=高德返回有效定位，false=调用失败/限流/未知IP */
        private boolean valid;
    }

    /**
     * 消费 Redis Stream 访问统计消息。
     *
     * @deprecated 已由 {@link ShortLinkStatsRabbitConsumer#onMessage} 重构替代，仅保留用于历史追溯和紧急回滚。
     */
    @Deprecated(since = "RabbitMQ重构", forRemoval = false)
    @Override
    public void onMessage(MapRecord<String, String, String> message) {
        String stream = message.getStream();
        RecordId id = message.getId();
        if (messageQueueIdempotentHandler.isMessageBeingConsumed(id.toString())) {
            // 判断当前的这个消息流程是否执行完成
            if (messageQueueIdempotentHandler.isAccomplish(id.toString())) {
                return;
            }
            throw new ServiceException("消息未完成流程，需要消息队列重试");
        }
        try {
            Map<String, String> producerMap = message.getValue();
            ShortLinkStatsRecordDTO statsRecord = JSON.parseObject(producerMap.get("statsRecord"), ShortLinkStatsRecordDTO.class);
            actualSaveShortLinkStats(statsRecord);
            stringRedisTemplate.opsForStream().delete(Objects.requireNonNull(stream), id.getValue());
        } catch (Throwable ex) {
            // 某某某情况宕机了
            messageQueueIdempotentHandler.delMessageProcessed(id.toString());
            log.error("记录短链接监控消费异常", ex);
            throw ex;
        }
        messageQueueIdempotentHandler.setAccomplish(id.toString());
    }

    /**
     * 在同一事务内完成一次访问统计的多表写入，异常时回滚后交由 RabbitMQ 消费重试。
     *
     * @param statsRecord 短链接访问统计记录
     */
    @Transactional(rollbackFor = Exception.class)
    public void actualSaveShortLinkStats(ShortLinkStatsRecordDTO statsRecord) {
        String fullShortUrl = statsRecord.getFullShortUrl();
        RReadWriteLock readWriteLock = redissonClient.getReadWriteLock(String.format(LOCK_GID_UPDATE_KEY, fullShortUrl));
        RLock rLock = readWriteLock.readLock();
        rLock.lock();
        try {
            LambdaQueryWrapper<ShortLinkGotoDO> queryWrapper = Wrappers.lambdaQuery(ShortLinkGotoDO.class)
                    .eq(ShortLinkGotoDO::getFullShortUrl, fullShortUrl);
            ShortLinkGotoDO shortLinkGotoDO = shortLinkGotoMapper.selectOne(queryWrapper);
            String gid = shortLinkGotoDO.getGid();
            Date currentDate = statsRecord.getCurrentDate();
            int hour = DateUtil.hour(currentDate, true);
            Week week = DateUtil.dayOfWeekEnum(currentDate);
            int weekValue = week.getIso8601Value();
            LinkAccessStatsDO linkAccessStatsDO = LinkAccessStatsDO.builder()
                    .pv(1)
                    .uv(statsRecord.getUvFirstFlag() ? 1 : 0)
                    .uip(statsRecord.getUipFirstFlag() ? 1 : 0)
                    .hour(hour)
                    .weekday(weekValue)
                    .fullShortUrl(fullShortUrl)
                    .date(currentDate)
                    .build();
            linkAccessStatsMapper.shortLinkStats(linkAccessStatsDO);
            // ========== 地理位置统计（高德 API，已优化：缓存+开关+快速降级）==========
            String actualProvince = "未知";
            String actualCity = "未知";
            if (statsLocaleEnable) {
                LocaleResult locale = resolveLocale(statsRecord.getRemoteAddr());
                if (locale.isValid()) {
                    actualProvince = locale.getProvince();
                    actualCity = locale.getCity();
                    LinkLocaleStatsDO linkLocaleStatsDO = LinkLocaleStatsDO.builder()
                            .province(actualProvince)
                            .city(actualCity)
                            .adcode(locale.getAdcode())
                            .cnt(1)
                            .fullShortUrl(fullShortUrl)
                            .country("中国")
                            .date(currentDate)
                            .build();
                    linkLocaleStatsMapper.shortLinkLocaleState(linkLocaleStatsDO);
                }
                // locale.isValid()==false 时静默降级为"未知"，不写入 locale 表、不阻断事务
            }
            LinkOsStatsDO linkOsStatsDO = LinkOsStatsDO.builder()
                    .os(statsRecord.getOs())
                    .cnt(1)
                    .fullShortUrl(fullShortUrl)
                    .date(currentDate)
                    .build();
            linkOsStatsMapper.shortLinkOsState(linkOsStatsDO);
            LinkBrowserStatsDO linkBrowserStatsDO = LinkBrowserStatsDO.builder()
                    .browser(statsRecord.getBrowser())
                    .cnt(1)
                    .fullShortUrl(fullShortUrl)
                    .date(currentDate)
                    .build();
            linkBrowserStatsMapper.shortLinkBrowserState(linkBrowserStatsDO);
            LinkDeviceStatsDO linkDeviceStatsDO = LinkDeviceStatsDO.builder()
                    .device(statsRecord.getDevice())
                    .cnt(1)
                    .fullShortUrl(fullShortUrl)
                    .date(currentDate)
                    .build();
            linkDeviceStatsMapper.shortLinkDeviceState(linkDeviceStatsDO);
            LinkNetworkStatsDO linkNetworkStatsDO = LinkNetworkStatsDO.builder()
                    .network(statsRecord.getNetwork())
                    .cnt(1)
                    .fullShortUrl(fullShortUrl)
                    .date(currentDate)
                    .build();
            linkNetworkStatsMapper.shortLinkNetworkState(linkNetworkStatsDO);
            LinkAccessLogsDO linkAccessLogsDO = LinkAccessLogsDO.builder()
                    .user(statsRecord.getUv())
                    .ip(statsRecord.getRemoteAddr())
                    .browser(statsRecord.getBrowser())
                    .os(statsRecord.getOs())
                    .network(statsRecord.getNetwork())
                    .device(statsRecord.getDevice())
                    .locale(StrUtil.join("-", "中国", actualProvince, actualCity))
                    .fullShortUrl(fullShortUrl)
                    .build();
            linkAccessLogsMapper.insert(linkAccessLogsDO);
            shortLinkMapper.incrementStats(gid, fullShortUrl, 1, statsRecord.getUvFirstFlag() ? 1 : 0, statsRecord.getUipFirstFlag() ? 1 : 0);
            LinkStatsTodayDO linkStatsTodayDO = LinkStatsTodayDO.builder()
                    .todayPv(1)
                    .todayUv(statsRecord.getUvFirstFlag() ? 1 : 0)
                    .todayUip(statsRecord.getUipFirstFlag() ? 1 : 0)
                    .fullShortUrl(fullShortUrl)
                    .date(currentDate)
                    .build();
            linkStatsTodayMapper.shortLinkTodayState(linkStatsTodayDO);
        } finally {
            rLock.unlock();
        }
    }

    /**
     * 解析 IP 对应的地理位置（带本地缓存）。
     * <p>
     * 优化前：每条统计消息都在事务内同步调用高德 API，压测时 QPS 爆限额 → 限流 →
     * HTTP 超时占数据库连接 → 连接池耗尽 → 雪崩。
     * <p>
     * 优化后：
     * <ul>
     *   <li>Guava 本地缓存（TTL 10min），同 IP 压测场景下高德调用从 N 次/秒降到 1 次/10 分钟</li>
     *   <li>超时从 5s 缩短到 2s，减少连接占用</li>
     *   <li>任何异常（限流/超时/网络错误）均返回 invalid LocaleResult，不抛异常，不阻断事务</li>
     * </ul>
     *
     * @param ip 目标 IP 地址
     * @return 地理位置结果，失败时 valid=false、省市为"未知"
     */
    private LocaleResult resolveLocale(String ip) {
        if (StrUtil.isBlank(ip)) {
            return new LocaleResult("未知", "未知", "未知", false);
        }
        try {
            // 先查缓存
            LocaleResult cached = localeCache.getIfPresent(ip);
            if (cached != null) {
                return cached;
            }
            // 缓存未命中，调高德 API（超时 2s，原 5s）
            Map<String, Object> param = new HashMap<>();
            param.put("key", statsLocaleAmapKey);
            param.put("ip", ip);
            String resultStr = HttpUtil.get(AMAP_REMOTE_URL, param, 2000);
            JSONObject resultObj = JSON.parseObject(resultStr);
            String infoCode = resultObj.getString("infocode");
            LocaleResult locale;
            if (StrUtil.isNotBlank(infoCode) && StrUtil.equals(infoCode, "10000")) {
                String province = resultObj.getString("province");
                boolean unknownFlag = StrUtil.equals(province, "[]");
                locale = new LocaleResult(
                        unknownFlag ? "未知" : province,
                        unknownFlag ? "未知" : resultObj.getString("city"),
                        unknownFlag ? "未知" : resultObj.getString("adcode"),
                        true
                );
            } else {
                // 高德返回非成功码（含限流 10003/10011/10010 等），静默降级
                log.warn("高德IP定位返回非成功码 infocode={}，ip={}", infoCode, ip);
                locale = new LocaleResult("未知", "未知", "未知", false);
            }
            // 无论成功失败都写入缓存，避免对同一 IP 反复击打高德
            localeCache.put(ip, locale);
            return locale;
        } catch (Throwable ex) {
            log.error("高德IP定位异常，ip={}（已降级为未知，不影响事务）", ip, ex);
            LocaleResult fallback = new LocaleResult("未知", "未知", "未知", false);
            localeCache.put(ip, fallback);
            return fallback;
        }
    }
}
