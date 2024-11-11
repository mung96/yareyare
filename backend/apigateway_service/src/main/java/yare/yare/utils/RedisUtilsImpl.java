package yare.yare.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisUtilsImpl implements RedisUtils {
    private final RedisTemplate<String, Object> redisTemplate;

    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
