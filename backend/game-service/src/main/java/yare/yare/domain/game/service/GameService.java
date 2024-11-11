package yare.yare.domain.game.service;

import yare.yare.domain.game.dto.AvailableSeatListRes;
import yare.yare.domain.game.dto.GameDetailsRes;
import yare.yare.domain.game.dto.GameListRes;
import yare.yare.domain.game.dto.ScheduleListRes;
import yare.yare.domain.game.dto.*;


public interface GameService {

    GameListRes findGames();

    GameListRes findGamesByTeam(Integer teamId);

    AvailableSeatListRes findAvailableSeatListByGame(Long gameId);

    GameDetailsRes findGame(Long gameId);

    ReserveSeatRes reserveSeat(Long gameId, ReserveSeatReq reserveSeatReq);

    ScheduleListRes findScheduleList(Integer teamId, Integer year, Integer month);

    SeatListRes findSeats(Long gameId, Integer gradeId);

    LastGameListRes findLastGames();
}
