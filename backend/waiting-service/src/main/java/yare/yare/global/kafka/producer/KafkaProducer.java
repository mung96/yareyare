package yare.yare.global.kafka.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import yare.yare.global.kafka.dto.Message;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    private final ObjectMapper mapper;

    public void send(Long gameId, Message message) {

        String jsonMessage;

        try {
            jsonMessage = mapper.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException();
        }

        kafkaTemplate.send("yareyare.ticket.game-" + gameId + ".waiting", jsonMessage);
    }
}
