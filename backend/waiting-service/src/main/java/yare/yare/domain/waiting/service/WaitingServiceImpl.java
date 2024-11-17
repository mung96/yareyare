package yare.yare.domain.waiting.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yare.yare.domain.waiting.dto.JoinQueueReq;
import yare.yare.global.kafka.dto.Message;
import yare.yare.global.kafka.producer.KafkaProducer;
import yare.yare.global.redis.RedisUtil;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WaitingServiceImpl implements WaitingService {

    private final RedisUtil redisUtil;
    private final KafkaProducer kafkaProducer;

    @Override
    public void joinQueue(String memberId, JoinQueueReq joinQueueReq) {

        String token = UUID.randomUUID().toString();
        long timeStamp = System.currentTimeMillis();

        Message message = new Message(joinQueueReq.getGameId(), memberId, token);

        redisUtil.addWaitingMember(joinQueueReq.getGameId(), token, timeStamp);
        kafkaProducer.send(joinQueueReq.getGameId(), message);
    }
}
