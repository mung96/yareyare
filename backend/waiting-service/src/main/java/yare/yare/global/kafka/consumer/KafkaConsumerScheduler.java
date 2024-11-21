package yare.yare.global.kafka.consumer;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import yare.yare.global.redis.RedisUtil;

import java.util.List;

@EnableScheduling
@Component
@RequiredArgsConstructor
public class KafkaConsumerScheduler {

    private final RedisUtil redisUtil;
    private final KafkaConsumerService kafkaConsumerService;

    @Scheduled(fixedRate = 1000)
    public void controlConsumers() {

        List<String> games = redisUtil.getOpenGames();
        kafkaConsumerService.checkConsumers(games);
    }
}
