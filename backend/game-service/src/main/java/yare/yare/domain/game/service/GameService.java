package yare.yare.domain.game.service;

import yare.yare.domain.game.dto.*;

import java.util.List;


public interface GameService {

    GameListRes findGames();

    GameListRes findGamesByTeam(Integer teamId);

    AvailableSeatListRes findAvailableSeatListByGame(Long gameId);

    GameDetailsRes findGame(Long gameId);

    ReserveSeatRes reserveSeat(Long gameId, ReserveSeatReq reserveSeatReq);

    ScheduleListRes findScheduleList(Integer teamId, Integer year, Integer month);

    SeatListRes findSeats(Long gameId, Integer gradeId);

    LastGameListRes findLastGames();

    GetPriceRes getPrice(Long gameId, Long seatId);

    GameSeatDetailListRes getGameSeatDetails(Long gameId, List<Long> seatIds);

    void updateSeatStatus(Long gameId, GameSeatStatusUpdateDto gameSeatStatusUpdateDto);

    Boolean rollBackSeat(Long gameId, RollbackSeatReq rollbackSeatReq);
}
