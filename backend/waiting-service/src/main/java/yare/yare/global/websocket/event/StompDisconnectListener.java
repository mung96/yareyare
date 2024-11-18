package yare.yare.global.websocket.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompDisconnectListener {
    private final WebSocketSessionManager sessionManager;

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        log.info("disconnect websocket sessionId={}", sessionId);
        sessionManager.removeSessionById(sessionId);
    }
}
