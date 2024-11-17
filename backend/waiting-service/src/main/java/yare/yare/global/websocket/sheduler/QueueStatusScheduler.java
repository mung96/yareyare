package yare.yare.global.websocket.sheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import yare.yare.global.redis.RedisUtil;
import yare.yare.global.websocket.dto.QueueStatusDto;
import yare.yare.global.websocket.dto.WebSocketSessionInfo;
import yare.yare.global.websocket.event.WebSocketSessionManager;
import yare.yare.global.websocket.service.WebSocketMessagingService;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class QueueStatusScheduler {
    private final WebSocketSessionManager sessionManager;
    private final WebSocketMessagingService messagingService;
    private final RedisUtil redisUtil;

    @Scheduled(fixedRate = 5000)
    public void broadcastQueueStatus() {
        Map<String, WebSocketSessionInfo> allSessions = sessionManager.getAllSessions();

        allSessions.forEach((sessionId, sessionInfo) -> {
            Long position = redisUtil.getMemberRank(sessionInfo.getGameId(), sessionInfo.getToken());
            Long behind = redisUtil.getBehindCount(sessionInfo.getGameId(), sessionInfo.getToken());

            if(position == null) position = 0L;
            if(behind == null) behind = 0L;

            QueueStatusDto queueStatusDto = new QueueStatusDto(sessionInfo.getGameId(), sessionInfo.getToken(), position, behind);
            messagingService.sendMessageToUser(sessionInfo.getMemberId(), sessionInfo.getGameId(), queueStatusDto);
        });
    }
}
