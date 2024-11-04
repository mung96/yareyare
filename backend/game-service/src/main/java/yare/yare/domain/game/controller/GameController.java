package yare.yare.domain.game.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.game.dto.GameDetailsRes;
import yare.yare.domain.game.dto.GameDto;
import yare.yare.domain.game.dto.GameListRes;
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
}
