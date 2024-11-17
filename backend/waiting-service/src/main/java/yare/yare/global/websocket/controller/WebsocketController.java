package yare.yare.global.websocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.waiting.dto.JoinQueueReq;
import yare.yare.domain.waiting.service.WaitingService;
import yare.yare.global.jwt.JwtTokenService;
import yare.yare.global.websocket.dto.WebSocketSessionInfo;
import yare.yare.global.websocket.event.WebSocketSessionManager;
import yare.yare.global.websocket.service.WebSocketMessagingService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WebsocketController {
    private final WebSocketMessagingService messagingService;
    private final WaitingService waitingService;
    private final JwtTokenService jwtTokenService;
    private final WebSocketSessionManager sessionManager;

    @MessageMapping("/join-queue/{gameId}")
    public void joinQueue(SimpMessageHeaderAccessor headerAccessor,
                          @DestinationVariable Long gameId) {
        String authHeader = headerAccessor.getFirstNativeHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String memberId = jwtTokenService.getMemberUuid(authHeader);

            JoinQueueReq joinQueueReq = new JoinQueueReq(gameId);

            String token = waitingService.joinQueue(memberId, joinQueueReq, headerAccessor.getSessionId());

            WebSocketSessionInfo sessionInfo = new WebSocketSessionInfo(memberId, gameId, token);

            sessionManager.addSession(headerAccessor.getSessionId(), sessionInfo);

            messagingService.sendQueueStatusToWebSocket(gameId, token, memberId);
        }
    }
}
