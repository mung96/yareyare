package yare.yare.global.kafka.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import yare.yare.global.kafka.dto.base.Schema;

@Data
@AllArgsConstructor
public class KafkaCancelDto {
    private Schema schema;

    private SeatPayload seatPayload;
}
