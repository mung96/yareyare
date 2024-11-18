package yare.yare.global.websocket.event;

import org.springframework.stereotype.Component;
import yare.yare.global.websocket.dto.WebSocketSessionInfo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSessionManager {
    private final Map<String, WebSocketSessionInfo> sessions = new ConcurrentHashMap<>();

    public void addSession(String sessionId, WebSocketSessionInfo sessionInfo) {
        sessions.put(sessionId, sessionInfo);
    }

    public void removeSessionById(String sessionId) {
        sessions.remove(sessionId);
    }

    public Map<String, WebSocketSessionInfo> getAllSessions() {
        return sessions;
    }
}
