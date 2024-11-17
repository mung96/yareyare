package yare.yare.global.redis;

public interface RedisUtil {
    void addWaitingMember(Long gameId, String token, Long timeStamp);

    boolean deleteWaitingMember(Long gameId, String token);

    void addActiveMember(Long gameId, String memberId, String token);
}
