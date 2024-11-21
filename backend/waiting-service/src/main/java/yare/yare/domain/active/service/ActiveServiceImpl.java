package yare.yare.domain.active.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yare.yare.global.redis.RedisUtil;

@Service
@RequiredArgsConstructor
public class ActiveServiceImpl implements ActiveService {

    private final RedisUtil redisUtil;

    @Override
    public void addActiveMember(Long gameId, String memberId, String token) {

        if (redisUtil.deleteWaitingMember(gameId, token)) {
            redisUtil.addActiveMember(gameId, memberId, token);
        }
    }
 }
