package yare.yare.global.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

        redisTemplate.opsForValue().set("active:member:" + gameId + ":" + memberId, token, 1800, TimeUnit.SECONDS);
        redisTemplate.opsForValue().increment("active:count:" + gameId);
    }

    @Override
    public List<String> getOpenGames() {

        List<Object> active = redisTemplate.opsForList().range("active:list", 0, -1);

        if (active == null || active.isEmpty()) return new ArrayList<>();

        return active.stream().map(String::valueOf).toList();
    }

    @Override
    public Integer countActiveMember(String gameId) {
        return (Integer) redisTemplate.opsForValue().get("active:count:" + gameId);
    }

    @Override
    public void addGame(Long gameId) {
        redisTemplate.opsForList().rightPush("active:list", String.valueOf(gameId));
        redisTemplate.opsForValue().set("active:count:" + gameId, 0);
    }
}
