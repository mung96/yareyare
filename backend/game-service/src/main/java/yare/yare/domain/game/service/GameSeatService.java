package yare.yare.domain.game.service;

import yare.yare.domain.game.entity.Game;

public interface GameSeatService {

    void setupGameSeat(final Game game);

    void setupGameSeatByGameId(Long gameId);
}
