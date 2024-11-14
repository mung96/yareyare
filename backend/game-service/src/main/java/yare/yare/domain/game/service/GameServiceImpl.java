package yare.yare.domain.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.game.dto.*;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.entity.GameSeat;
import yare.yare.domain.game.repository.GameRepository;
import yare.yare.domain.game.repository.GameSeatRepository;
import yare.yare.global.exception.CustomException;
import yare.yare.global.utils.RedisUtil;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static yare.yare.domain.stadium.enums.SeatStatus.AVAILABLE;
import static yare.yare.domain.stadium.enums.SeatStatus.PENDING;
import static yare.yare.global.statuscode.ErrorCode.ALREADY_RESERVED;
import static yare.yare.global.statuscode.ErrorCode.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final RedisUtil redisUtil;
    private final GameSeatRepository gameSeatRepository;

    @Override
    public GameListRes findGames() {

        List<Game> nextGames = gameRepository.findNextGames();

        List<GameDto> games = nextGames.stream().map(GameDto::toDto).toList();

        GameListRes gameListRes = new GameListRes();
        gameListRes.setGames(games);

        return gameListRes;
    }

    @Override
    public GameListRes findGamesByTeam(Integer teamId) {

        List<Game> nextGames = gameRepository.findNextGamesByTeam(teamId, LocalDate.now().plusDays(10));

        List<GameDto> games = nextGames.stream().map(GameDto::toDto).toList();

        GameListRes gameListRes = new GameListRes();
        gameListRes.setGames(games);

        return gameListRes;
    }

    @Override
    public GameDetailsRes findGame(Long gameId) {

        Game game = gameRepository.findGameByGameId(gameId)
                .orElseThrow(() -> new CustomException(NOT_FOUND));

        return GameDetailsRes.toDto(game);
    }

    @Override
    public AvailableSeatListRes findAvailableSeatListByGame(Long gameId) {

        if (!gameRepository.existsById(gameId)) {
            throw new CustomException(NOT_FOUND);
        }

        AvailableSeatListRes availableSeatListRes = new AvailableSeatListRes();

        List<GradeDto> grades = gameRepository.findAvailableSeatListByGameId(gameId);
        availableSeatListRes.setGrades(grades);

        return availableSeatListRes;
    }

    @Override
    public SeatListRes findSeats(Long gameId, Integer gradeId) {

        List<GameSeat> gameSeats = gameRepository.findGameSeatsByGradeId(gameId, gradeId);

        if (gameSeats.isEmpty()) {
            throw new CustomException(NOT_FOUND);
        }

        return SeatListRes.toDto(gameSeats);
    }

    @Override
    public LastGameListRes findLastGames() {

        List<Game> lastGames = gameRepository.findLastGames();

        return LastGameListRes.toDto(lastGames);
    }

    @Override
    @Transactional
    public ReserveSeatRes reserveSeat(Long gameId, ReserveSeatReq reserveSeatReq) {

        pendInRedis(gameId, reserveSeatReq);

        List<GameSeat> selectedSeats = gameRepository.findSelectedSeats(gameId, reserveSeatReq.getSeats());

        checkAvailableSeats(reserveSeatReq, selectedSeats);

        gameRepository.updateSeatStatus(PENDING, gameId, reserveSeatReq.getSeats());

        ReserveSeatRes reserveSeatRes = new ReserveSeatRes();
        reserveSeatRes.setPrice(getPrice(selectedSeats));

        return reserveSeatRes;
    }

    private void pendInRedis(Long gameId, ReserveSeatReq reserveSeatReq) {

        List<String> keys = new ArrayList<>();

        for (Long seatId : reserveSeatReq.getSeats()) {
            String key = String.format("seat:%d:%d", gameId, seatId);
            boolean lock = redisUtil.lock(key, reserveSeatReq.getIdempotentKey(), 600L);

            if (lock) {
                keys.add(key);
            } else {
                for (String k : keys) {
                    redisUtil.deleteData("lock:" + k);
                }

                throw new CustomException(ALREADY_RESERVED);
            }
        }
    }

    private static void checkAvailableSeats(ReserveSeatReq reserveSeatReq, List<GameSeat> selectedSeats) {

        if (selectedSeats.size() < reserveSeatReq.getSeats().size() || selectedSeats.isEmpty()) {
            throw new CustomException(NOT_FOUND);
        }

        for (GameSeat selectedSeat : selectedSeats) {
            if (!selectedSeat.getSeatStatus().equals(AVAILABLE)) {
                throw new CustomException(ALREADY_RESERVED);
            }
        }
    }

    private static Integer getPrice(List<GameSeat> selectedSeats) {
        return selectedSeats.getFirst().getPrice();
    }

    @Override
    public ScheduleListRes findScheduleList(Integer teamId, Integer year, Integer month) {

        LocalDate findOptionStartDate = LocalDate.of(year, month, 1);
        LocalDate findOptionEndDate = LocalDate.of(year, month, 1).plusMonths(1);

        List<Game> games = gameRepository.findScheduleListWithYearAndMonth(teamId, findOptionStartDate, findOptionEndDate);

        return ScheduleListRes.of(games, teamId);
    }

    @Override
    public GetPriceRes getPrice(Long gameId, Long seatId) {

        Integer price = gameRepository.getPrice(gameId, seatId)
                .orElseThrow(() -> new CustomException(NOT_FOUND));

        GetPriceRes getPriceRes = new GetPriceRes();
        getPriceRes.setPrice(price);

        return getPriceRes;
    }

    @Override
    public GameSeatDetailListRes getGameSeatDetails(final Long gameId, final List<Long> seatIds) {

        GameSeatDetailListRes gameSeatDetailListRes = new GameSeatDetailListRes();

        List<GameSeatDetailDto> gameSeatDetailDtos = seatIds.stream().map((seatId) -> {
            GameSeat gameSeat = gameSeatRepository.findByGameIdAndSeatId(gameId, seatId)
                    .orElseThrow(() -> new CustomException(NOT_FOUND));

            AtomicInteger cnt = new AtomicInteger(0);

            if(cnt.getAndIncrement() == 0){
                gameSeatDetailListRes.setPrice(gameSeat.getPrice());
                gameSeatDetailListRes.setGradeId(gameSeat.getGradeId());
                gameSeatDetailListRes.setGradeName(gameSeat.getGradeName());
            }
            return GameSeatDetailDto.toDto(gameSeat);
        }).toList();
        gameSeatDetailListRes.setSeats(gameSeatDetailDtos);

        return gameSeatDetailListRes;
    }
}
