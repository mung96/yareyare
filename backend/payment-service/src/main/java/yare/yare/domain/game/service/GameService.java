package yare.yare.domain.game.service;

import yare.yare.domain.game.dto.SeatInfoRes;

import java.util.List;

public interface GameService {
    SeatInfoRes getSeatsInfo(Long gameId, List<Long> seatIds);
}
