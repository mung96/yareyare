package yare.yare.global.kafka.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Service;
import yare.yare.domain.active.service.ActiveService;
import yare.yare.global.exception.CustomException;
import yare.yare.global.kafka.dto.Message;
import yare.yare.global.redis.RedisUtil;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static yare.yare.global.statuscode.ErrorCode.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final KafkaListenerContainerFactory<ConcurrentMessageListenerContainer<String, String>> containerFactory;
    private final Map<String, ConcurrentMessageListenerContainer<String, String>> containers = new ConcurrentHashMap<>();
    private final RedisUtil redisUtil;
    private final ObjectMapper mapper;
    private final ActiveService activeService;
    private final Long MAX_MEMBER = 1000L;

    private void startConsumer(String topic) {

        if (containers.containsKey(topic)) return;

        ConcurrentMessageListenerContainer<String, String> container = containerFactory.createContainer(topic);
        container.setupMessageListener((MessageListener<String, String>) record -> handleMessage(record.value()));
        container.setAutoStartup(true);
        container.start();
        containers.put(topic, container);
    }

    private void handleMessage(String jsonMessage) {

        Message message;

        try {
            message = mapper.readValue(jsonMessage, Message.class);
        } catch (JsonProcessingException e) {
            throw new CustomException(BAD_REQUEST);
        }

        activeService.addActiveMember(message.getGameId(), message.getMemberId(), message.getToken());
    }

    private void stopConsumer(String topic) {

        if (!containers.containsKey(topic)) return;

        ConcurrentMessageListenerContainer<String, String> container = containers.get(topic);
        container.stop();
        containers.remove(topic);
    }

    public void checkConsumers(List<String> games) {

        for (String gameId : games) {
            String topic = "yareyare.ticket.game-" + gameId + ".waiting";

            Integer activeMember = redisUtil.countActiveMember(gameId);

            if (activeMember != null && activeMember < MAX_MEMBER) {
                startConsumer(topic);
            } else {
                stopConsumer(topic);
            }
        }
    }
}