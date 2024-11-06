package yare.yare.domain.game.service;

import yare.yare.domain.game.dto.*;


public interface GameService {

    GameListRes findGames();

    GameListRes findGamesByTeam(Integer teamId);

    AvailableSeatListRes findAvailableSeatListByGame(Long gameId);

    GameDetailsRes findGame(Long gameId);

    SeatListRes findSeats(Long gameId, Integer gradeId);

    LastGameListRes findLastGames();
}
