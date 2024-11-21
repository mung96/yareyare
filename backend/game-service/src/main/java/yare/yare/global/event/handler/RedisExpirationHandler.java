package yare.yare.global.event.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;
import yare.yare.domain.game.entity.GameSeat;
import yare.yare.domain.game.repository.GameSeatRepository;

import static yare.yare.domain.stadium.enums.SeatStatus.PENDING;

@Component
@RequiredArgsConstructor
public class RedisExpirationHandler implements MessageListener {

    private final GameSeatRepository gameSeatRepository;
    private static final String MESSAGE_PREFIX = "lock:seat";

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String expiredKey = message.toString();

        if (expiredKey.startsWith(MESSAGE_PREFIX)) {
            String gameSeatKey = expiredKey.substring(MESSAGE_PREFIX.length()+1);

            long gameId = getGameId(gameSeatKey);
            long seatId = getSeatId(gameSeatKey);

            GameSeat gameSeat = gameSeatRepository.findByGameIdAndSeatId(gameId, seatId).orElse(null);
            if (gameSeat != null) {
                if (gameSeat.getSeatStatus() == PENDING) {
                    gameSeat.setAvailable();
                }
                gameSeatRepository.save(gameSeat);
            }
        }
    }

    private long getGameId(String key) {
        return Long.parseLong(key.substring(0, key.indexOf(":")));
    }

    private long getSeatId(String key) {
        return Long.parseLong(key.substring(key.indexOf(":") + 1));
    }
}
