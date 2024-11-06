package yare.yare.domain.game.service;

import yare.yare.domain.game.dto.AvailableSeatListRes;
import yare.yare.domain.game.dto.GameDetailsRes;
import yare.yare.domain.game.dto.GameListRes;
import yare.yare.domain.game.dto.SeatListRes;


public interface GameService {

    GameListRes findGames();

    GameListRes findGamesByTeam(Integer teamId);

    AvailableSeatListRes findAvailableSeatListByGame(Long gameId);

    GameDetailsRes findGame(Long gameId);

    SeatListRes findSeats(Long gameId, Integer gradeId);
}
