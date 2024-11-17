package yare.yare.global.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

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
}
