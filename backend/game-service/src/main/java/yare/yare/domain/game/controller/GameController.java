package yare.yare.domain.game.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.game.dto.*;
import yare.yare.domain.game.enums.GameStatus;
import yare.yare.domain.game.service.GameService;
import yare.yare.global.dto.ResponseDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static yare.yare.global.statuscode.SuccessCode.CREATED;
import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

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

        AvailableSeatListRes result = new AvailableSeatListRes();

        List<GradeDto> grades = new ArrayList<>();

        grades.add(GradeDto.builder()
                .gradeId(36)
                .gradeName("1루 내야")
                .availableSeats(1)
                .build());

        grades.add(GradeDto.builder()
                .gradeId(37)
                .gradeName("1루 외야")
                .availableSeats(237)
                .build());

        grades.add(GradeDto.builder()
                .gradeId(38)
                .gradeName("중앙테이블석")
                .availableSeats(30)
                .build());

        grades.add(GradeDto.builder()
                .gradeId(39)
                .gradeName("3루 내야")
                .availableSeats(147)
                .build());

        grades.add(GradeDto.builder()
                .gradeId(40)
                .gradeName("3루 외야")
                .availableSeats(234)
                .build());

        result.setGrades(grades);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/{gameId}/seats")
    public ResponseDto<SeatListRes> seatList(
            @PathVariable Long gameId,
            @RequestParam Integer gradeId) {

        SeatListRes result = gameService.findSeats(gameId, gradeId);

        return ResponseDto.success(OK, result);
    }

    @PostMapping("/{gameId}/seats")
    public ResponseDto<ReserveSeatRes> reserveSeat(
            @PathVariable Long gameId,
            @RequestBody @Valid ReserveSeatReq reserveSeatReq) {

        ReserveSeatRes result = new ReserveSeatRes();
        result.setPrice(15000);

        return ResponseDto.success(CREATED, result);
    }

    @GetMapping("/teams/{teamId}/schedule")
    public ResponseDto<ScheduleListRes> scheduleList(
            @PathVariable Integer teamId,
            @RequestParam Integer year,
            @RequestParam Integer month) {

        ScheduleListRes result = new ScheduleListRes();

        List<ScheduleDto> schedules = new ArrayList<>();

        for (int date = 1; date <= 3; date++) {
            schedules.add(ScheduleDto.builder()
                    .gameDate(LocalDate.of(year, month, date))
                    .startTime(LocalTime.of(18, 30))
                    .opponentTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kt.svg")
                    .gameStatus(GameStatus.LOSE)
                    .region("수원")
                    .isHome(false)
                    .build());
        }

        for (int date = 5; date <= 7; date++) {
            schedules.add(ScheduleDto.builder()
                    .gameDate(LocalDate.of(year, month, date))
                    .startTime(LocalTime.of(18, 30))
                    .opponentTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/samsung.svg")
                    .gameStatus(GameStatus.WIN)
                    .region("광주")
                    .isHome(true)
                    .build());
        }

        for (int date = 8; date <= 10; date++) {
            schedules.add(ScheduleDto.builder()
                    .gameDate(LocalDate.of(year, month, date))
                    .startTime(LocalTime.of(18, 30))
                    .opponentTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/lg.svg")
                    .gameStatus(GameStatus.SCHEDULED)
                    .region("광주")
                    .isHome(true)
                    .build());
        }

        for (int date = 12; date <= 14; date++) {
            schedules.add(ScheduleDto.builder()
                    .gameDate(LocalDate.of(year, month, date))
                    .startTime(LocalTime.of(18, 30))
                    .opponentTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/hanhwa.svg")
                    .gameStatus(GameStatus.SCHEDULED)
                    .region("대전")
                    .isHome(false)
                    .build());
        }

        result.setSchedules(schedules);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/results")
    public ResponseDto<LastGameListRes> lastGameList() {

        List<ResultDto> results = new ArrayList<>();

        results.add(ResultDto.builder()
                .homeTeamScore(2)
                .homeTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kiwoom.svg")
                .awayTeamScore(1)
                .awayTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kia.svg")
                .gameStatus(GameStatus.WIN)
                .build());

        results.add(ResultDto.builder()
                .homeTeamScore(2)
                .homeTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/doosan.svg")
                .awayTeamScore(12)
                .awayTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/lotte.svg")
                .gameStatus(GameStatus.LOSE)
                .build());

        results.add(ResultDto.builder()
                .homeTeamScore(3)
                .homeTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/samsung.svg")
                .awayTeamScore(1)
                .awayTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kt.svg")
                .gameStatus(GameStatus.WIN)
                .build());

        results.add(ResultDto.builder()
                .homeTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kiwoom.svg")
                .awayTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kia.svg")
                .gameStatus(GameStatus.OFF)
                .build());

        results.add(ResultDto.builder()
                .homeTeamScore(5)
                .homeTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kiwoom.svg")
                .awayTeamScore(9)
                .awayTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kia.svg")
                .gameStatus(GameStatus.WIN)
                .build());

        LastGameListRes result = LastGameListRes.builder()
                .gameDate(LocalDate.now().minusDays(1))
                .results(results)
                .build();

        return ResponseDto.success(OK, result);
    }
}
