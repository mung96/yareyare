package yare.yare.global.kafka.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class KafkaGameSeatDto {
    private Long gameId;
    private List<Long> seatsId;
}
