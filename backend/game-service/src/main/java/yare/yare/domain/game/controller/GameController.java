package yare.yare.domain.game.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.game.dto.*;
import yare.yare.domain.game.service.GameService;
import yare.yare.global.dto.ResponseDto;
import yare.yare.global.feign.dto.PaymentValidationRes;
import yare.yare.global.feign.service.FeignService;

import java.time.LocalDate;
import java.util.List;

import static yare.yare.global.statuscode.ErrorCode.BAD_REQUEST;
import static yare.yare.global.statuscode.SuccessCode.NO_CONTENT;
import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final FeignService feignService;

    @GetMapping
    public ResponseDto<GameListRes> gameList() {

        GameListRes result = gameService.findGames();

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/teams/{teamId}")
    public ResponseDto<GameListRes> gameList(
            @PathVariable Integer teamId) {

        GameListRes result = gameService.findGamesByTeam(teamId);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/{gameId}/details")
    public ResponseDto<GameDetailsRes> gameDetails(
            @PathVariable Long gameId) {

        GameDetailsRes result = gameService.findGame(gameId);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/{gameId}/grades")
    public ResponseDto<AvailableSeatListRes> availableSeatList(
            @PathVariable Long gameId) {

        AvailableSeatListRes result = gameService.findAvailableSeatListByGame(gameId);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/{gameId}/seats")
    public ResponseDto<SeatListRes> seatList(
            @PathVariable Long gameId,
            @RequestParam Integer gradeId) {

        SeatListRes result = gameService.findSeats(gameId, gradeId);

        return ResponseDto.success(OK, result);
    }

    @PatchMapping("/{gameId}/seats")
    public ResponseDto<ReserveSeatRes> reserveSeat(
            @PathVariable Long gameId,
            @RequestBody @Valid ReserveSeatReq reserveSeatReq) {

        ReserveSeatRes result = gameService.reserveSeat(gameId, reserveSeatReq);

        return ResponseDto.success(OK, result);
    }

    @PatchMapping("/{gameId}/seats/sold-out")
    public ResponseDto<Void> soldOutSeat(
            @PathVariable Long gameId,
            @RequestBody @Valid GameSeatStatusUpdateDto gameSeatStatusUpdateDto) {

        PaymentValidationRes paymentValidationRes = feignService.validatePaymentInfo(gameId, gameSeatStatusUpdateDto);
        if(paymentValidationRes.inValid()){
            return ResponseDto.fail(BAD_REQUEST);
        }
        gameService.updateSeatStatus(gameId,gameSeatStatusUpdateDto);
        return ResponseDto.success(NO_CONTENT);
    }

    @GetMapping("/teams/{teamId}/schedule")
    public ResponseDto<ScheduleListRes> scheduleList(
            @PathVariable Integer teamId,
            @RequestParam Integer year,
            @RequestParam Integer month) {

        if (year == null) {
            year = LocalDate.now().getYear();
        }
        if (month == null) {
            month = LocalDate.now().getMonthValue();
        }
        ScheduleListRes result = gameService.findScheduleList(teamId, year, month);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/results")
    public ResponseDto<LastGameListRes> lastGameList() {

        LastGameListRes result = gameService.findLastGames();

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/{gameId}/seats/{seatId}/price")
    public ResponseDto<GetPriceRes> getPrice(
            @PathVariable Long gameId,
            @PathVariable Long seatId) {

        GetPriceRes result = gameService.getPrice(gameId, seatId);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/{gameId}/seats/details")
    public ResponseDto<GameSeatDetailListRes> getGameSeatDetails(
            @PathVariable Long gameId,
            @RequestParam List<Long> seatIds) {

        GameSeatDetailListRes result = gameService.getGameSeatDetails(gameId, seatIds);

        return ResponseDto.success(OK, result);
    }
}
