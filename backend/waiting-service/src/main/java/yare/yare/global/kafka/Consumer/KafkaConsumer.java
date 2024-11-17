package yare.yare.global.kafka.Consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import yare.yare.domain.active.service.ActiveService;
import yare.yare.global.exception.CustomException;
import yare.yare.global.kafka.dto.Message;

import static yare.yare.global.statuscode.ErrorCode.BAD_REQUEST;

@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private final ActiveService activeService;
    private final ObjectMapper mapper;

    @KafkaListener(
            topicPattern = "yareyare\\.ticket\\.game-.*\\.waiting",
            groupId = "group")
    public void listen(String jsonMessage) {

        Message message;

        try {
            message = mapper.readValue(jsonMessage, Message.class);
        } catch (JsonProcessingException e) {
            throw new CustomException(BAD_REQUEST);
        }

        activeService.addActiveMember(message.getGameId(), message.getMemberId(), message.getToken());
    }
}
