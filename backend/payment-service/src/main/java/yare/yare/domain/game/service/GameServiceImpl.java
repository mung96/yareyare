package yare.yare.domain.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yare.yare.domain.game.dto.PriceRes;
import yare.yare.domain.game.feign_client.GameFeignClientCustom;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {
    private final GameFeignClientCustom gameFeignClientCustom;

    @Override
    public PriceRes getSeatPrice(Long gameId, Long seatId) {
        return gameFeignClientCustom.getSeatPrice(gameId, seatId);
    }
}
