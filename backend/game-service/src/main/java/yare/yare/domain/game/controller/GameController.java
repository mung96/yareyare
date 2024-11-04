package yare.yare.domain.game.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.game.dto.*;
import yare.yare.global.dto.ResponseDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
public class GameController {

    @GetMapping("/teams")
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
            @PathVariable Long gameId) {
        
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
        
}
