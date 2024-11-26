package yare.yare.domain.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yare.yare.domain.game.dto.CheckSeatReq;
import yare.yare.domain.game.dto.CheckSeatRes;
import yare.yare.domain.game.dto.SeatInfoRes;
import yare.yare.domain.game.feign_client.GameFeignClientCustom;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {
    private final GameFeignClientCustom gameFeignClientCustom;

    @Override
    public SeatInfoRes getSeatsInfo(Long gameId, List<Long> seatIds) {
        return gameFeignClientCustom.getSeatPrice(gameId, seatIds);
    }

    @Override
    public CheckSeatRes checkValidSeats(Long gameId, CheckSeatReq checkSeatReq) {
        return gameFeignClientCustom.checkValidSeats(gameId, checkSeatReq);
    }
}
