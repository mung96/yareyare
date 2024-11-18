package yare.yare.global.redis;

import java.util.Map;

public interface RedisUtil {
    void addWaitingMember(Long gameId, String token, Long timeStamp);

    boolean deleteWaitingMember(Long gameId, String token);

    void addActiveMember(Long gameId, String memberId, String token);

    Long getMemberRank(Long gameId, String token);

    Long getBehindCount(Long gameId, String token);
}
