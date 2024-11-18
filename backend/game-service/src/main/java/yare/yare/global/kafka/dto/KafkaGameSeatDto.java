package yare.yare.global.kafka.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KafkaGameSeatDto implements Serializable {
    private Long gameId;
    private List<Long> seatsId;
}
