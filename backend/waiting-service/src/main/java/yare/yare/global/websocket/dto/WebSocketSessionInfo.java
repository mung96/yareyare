package yare.yare.global.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebSocketSessionInfo {
    private String memberId;

    private Long gameId;

    private String token;
}
