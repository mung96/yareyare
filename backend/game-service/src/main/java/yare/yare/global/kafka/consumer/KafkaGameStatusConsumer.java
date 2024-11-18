package yare.yare.global.kafka.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import yare.yare.domain.game.entity.GameSeat;
import yare.yare.domain.game.repository.GameSeatRepository;
import yare.yare.global.kafka.dto.KafkaGameSeatDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaGameStatusConsumer {
    private final GameSeatRepository gameSeatRepository;

    @KafkaListener(topicPattern = "yareyare.ticket.game-*.cancellation")
    public void updateSeatStatus(String message){
        log.info("kafka message: {}", message);
        ObjectMapper mapper = new ObjectMapper();
        try{
            KafkaGameSeatDto gameSeatDto = mapper.readValue(message, KafkaGameSeatDto.class);
            for(Long seatId : gameSeatDto.getSeatsId()){
                GameSeat gameSeat = gameSeatRepository.findByGameIdAndSeatId(gameSeatDto.getGameId(),seatId)
                        .orElse(null);
                if(gameSeat != null){
                    gameSeat.setAvailable();
                    gameSeatRepository.save(gameSeat);
                }
            }
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }
    }
}
