package yare.yare.global.websocket.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import yare.yare.global.redis.RedisUtil;
import yare.yare.global.websocket.dto.QueueStatusDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketMessagingService {
    private final SimpMessagingTemplate messagingTemplate;
    private final RedisUtil redisUtil;

    public void sendQueueStatusToWebSocket(Long gameId, String token, String memberId) {
        long position = redisUtil.getMemberRank(gameId, token);
        long behind = redisUtil.getBehindCount(gameId, token);

        QueueStatusDto queueStatusDto = new QueueStatusDto(gameId, token, position, behind);

        messagingTemplate.convertAndSend("/topic/queue-status/game/" + gameId+"/memberId/"+memberId, queueStatusDto);
    }

    public void sendMessageToUser(String memberId, Long gameId, QueueStatusDto queueStatusDto) {
        messagingTemplate.convertAndSend( "/topic/queue-status/game/" + gameId+"/memberId/"+memberId, queueStatusDto);
    }
}

