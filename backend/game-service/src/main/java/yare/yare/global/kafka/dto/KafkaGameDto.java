package yare.yare.global.kafka.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import yare.yare.global.kafka.dto.base.Schema;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class KafkaGameDto implements Serializable {

    private Schema schema;

    private GamePayload payload;
}
