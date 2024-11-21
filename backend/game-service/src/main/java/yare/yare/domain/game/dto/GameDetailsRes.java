package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.Game;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class GameDetailsRes {

    private String seasonName;

    private String homeTeamName;

    private String awayTeamName;

    private LocalDate gameDate;

    private LocalTime startTime;

    private String stadiumName;

    public static GameDetailsRes toDto(Game game) {

        return GameDetailsRes.builder()
                .seasonName(game.getSeasonName())
                .homeTeamName(game.getHomeTeamName())
                .awayTeamName(game.getAwayTeamName())
                .gameDate(game.getGameDate())
                .startTime(game.getStartTime())
                .stadiumName(game.getStadiumName())
                .build();
    }
}