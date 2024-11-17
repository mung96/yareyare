package yare.yare.global.kafka.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import yare.yare.global.kafka.dto.KafkaCancelDto;
import yare.yare.global.kafka.dto.SeatPayload;
import yare.yare.global.kafka.dto.base.Field;
import yare.yare.global.kafka.dto.base.Schema;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaPaymentProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    private final List<Field> fields = Arrays.asList(
            new Field("long", false, "game_id"),
            new Field("list", false, "seats_id")
    );

    private final Schema schema = Schema.builder()
            .type("struct")
            .fields(fields)
            .optional(false)
            .name("ticket")
            .build();

    public void sendCanceledSeats(final Long gameId, final List<Long> seatsId) {
        String topicName = String.format("yareyare.ticket.game-%d.cancellation", gameId);

        SeatPayload payload = SeatPayload.builder()
                .gameId(gameId)
                .seatsId(seatsId)
                .build();

        KafkaCancelDto kafkaCancelDto = new KafkaCancelDto(schema, payload);

        ObjectMapper mapper = new ObjectMapper();

        try {
            String jsonInString = mapper.writeValueAsString(kafkaCancelDto);
            kafkaTemplate.send(topicName, jsonInString);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
        }
    }
}
