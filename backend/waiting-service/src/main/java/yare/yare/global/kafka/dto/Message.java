package yare.yare.global.kafka.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message implements Serializable {

    private Long gameId;

    private String memberId;

    private String token;

    private String sessionId;
}
