package yare.yare.domain.game.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.game.dto.*;
import yare.yare.domain.game.enums.GameStatus;
import yare.yare.global.dto.ResponseDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static yare.yare.global.statuscode.SuccessCode.CREATED;
import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
public class GameController {

    @GetMapping
    public ResponseDto<GameListRes> gameList() {

        GameListRes result = new GameListRes();

        List<GameDto> games = new ArrayList<>();

        for (int i = 1; i < 4; i++) {
            games.add(GameDto.builder()
                    .gameId(1L)
                    .gameDate(LocalDate.now().plusDays(i))
                    .startTime(LocalTime.of(18, 30))
                    .stadiumName("광주 기아 챔피언스 필드")
                    .homeTeamName("기아")
                    .homeTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kia.svg")
                    .awayTeamName("삼성")
                    .awayTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/samsung.svg")
                    .build());
        }

        result.setGames(games);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/teams/{teamId}")
    public ResponseDto<GameListRes> gameList(
            @PathVariable Integer teamId) {

        GameListRes result = new GameListRes();

        List<GameDto> games = new ArrayList<>();

        for (int i = 1; i < 4; i++) {
            games.add(GameDto.builder()
                    .gameId(1L)
                    .gameDate(LocalDate.now().plusDays(i))
                    .startTime(LocalTime.of(18, 30))
                    .stadiumName("광주 기아 챔피언스 필드")
                    .homeTeamName("기아")
                    .homeTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kia.svg")
                    .awayTeamName("삼성")
                    .awayTeamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/samsung.svg")
                    .build());
        }

        result.setGames(games);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/{gameId}/details")
    public ResponseDto<GameDetailsRes> gameDetails(
            @PathVariable Long gameId) {

        GameDetailsRes result = GameDetailsRes.builder()
                .seasonName("신한 SOL Bank KBO 리그")
                .homeTeamName("기아")
                .awayTeamName("삼성")
                .gameDate(LocalDate.now().plusDays(1))
                .startTime(LocalTime.of(18, 30))
                .stadiumName("광주-기아 챔피언스 필드")
                .build();

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
        
        SeatListRes result = new SeatListRes();
        
        List<SectionDto> sections = new ArrayList<>();

        int seatId = 9241;

        for (int sectionName = 101; sectionName <= 106 ; sectionName++) {
            List<RowDto> rows = new ArrayList<>();

            for (int i = 0; i < 11; i++) {
                List<SeatDto> seats = new ArrayList<>();

                for (int j = 0; j < 20; j++) {
                    seats.add(SeatDto.builder()
                            .seatId((long) seatId++)
                            .seatNumber(j + 1)
                            .isAvailable((i + j) % 5 != 0)
                            .build()
                    );
                }

                String rowName = Character.toString((char) ('A' + i));

                rows.add(RowDto.builder()
                        .rowName(rowName)
                        .seats(seats)
                        .build());
            }

            sections.add(SectionDto.builder()
                    .sectionName(String.valueOf(sectionName))
                    .rows(rows)
                    .build());
        }
        
        result.setSections(sections);
        
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
