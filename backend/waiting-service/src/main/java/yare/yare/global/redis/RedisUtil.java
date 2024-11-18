package yare.yare.global.redis;

import java.util.List;

public interface RedisUtil {
    void addWaitingMember(Long gameId, String token, Long timeStamp);

    boolean deleteWaitingMember(Long gameId, String token);

    void addActiveMember(Long gameId, String memberId, String token);

    List<String> getOpenGames();

    Integer countActiveMember(String gameId);

    void addGame(Long gameId);
}
