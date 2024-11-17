package yare.yare.global.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QueueStatusDto {
    private Long gameId;

    private String token;

    private Long position;

    private Long behind;
}