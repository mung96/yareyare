package yare.yare.global.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisUtilImpl implements RedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void addWaitingMember(Long gameId, String token, Long timeStamp) {

        redisTemplate.opsForZSet().add("waiting:" + gameId, token, timeStamp);
    }

    @Override
    public boolean deleteWaitingMember(Long gameId, String token) {

        Long remove = redisTemplate.opsForZSet().remove("waiting:" + gameId, token);

        return remove != null && remove > 0;
    }

    @Override
    public void addActiveMember(Long gameId, String memberId, String token) {

        redisTemplate.opsForValue().set("active:" + gameId + ":" + memberId, token, 1800);
    }

    @Override
    public Long getMemberRank(Long gameId, String token) {
        Long rank = redisTemplate.opsForZSet().rank("waiting:" + gameId, token);
        return rank != null ? rank + 1 : null; // 1-based index로 변환
    }

    @Override
    public Long getBehindCount(Long gameId, String token) {
        Long totalSize = redisTemplate.opsForZSet().size("waiting:" + gameId); // 대기열 크기
        Long rank = redisTemplate.opsForZSet().rank("waiting:" + gameId, token); // 현재 rank

        log.info(String.valueOf(totalSize));
        log.info(String.valueOf(rank));
        if (rank == null || totalSize == null) {
            return null; // 멤버가 대기열에 없거나 대기열이 없는 경우
        }

        return totalSize- rank - 1;
    }

    @Override
    public Map<String, Integer> getQueueWithRanks(Long gameId) {
        Set<Object> queue = redisTemplate.opsForZSet().range("waiting:" + gameId, 0, -1);

        if (queue == null || queue.isEmpty()) {
            return Collections.emptyMap();
        }

        Map<String, Integer> queueWithRanks = new LinkedHashMap<>();
        for (Object user : queue) {
            if (user instanceof String) {
                Long rank = redisTemplate.opsForZSet().rank("waiting:" + gameId, user);
                if (rank != null) {
                    queueWithRanks.put((String) user, rank.intValue() + 1); // 1-based index
                }
            }
        }

        return queueWithRanks;
    }

}
