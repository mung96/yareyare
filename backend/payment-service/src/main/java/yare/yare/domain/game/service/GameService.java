package yare.yare.domain.game.service;

import yare.yare.domain.game.dto.PriceRes;

public interface GameService {
    PriceRes getSeatPrice(Long gameId, Long seatId);
}
