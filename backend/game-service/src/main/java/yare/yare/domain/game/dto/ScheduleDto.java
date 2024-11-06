package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.enums.GameStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

import static yare.yare.domain.game.enums.GameStatus.*;

@Data
@Builder
public class ScheduleDto {

    private LocalDate gameDate;

    private LocalTime startTime;

    private String opponentTeamLogo;

    private GameStatus gameStatus;

    private String region;

    private Boolean isHome;

    public static ScheduleDto of(Game game, Integer teamId) {
        Boolean isHome = Objects.equals(game.getHomeTeam().getId(), teamId);
        GameStatus gameStatus;
        Integer myTeamScore = isHome ? game.getHomeScore() : game.getAwayScore();
        Integer awayScore = isHome ? game.getAwayScore() : game.getHomeScore();

        if (game.getIsFinished()) {
            if (myTeamScore > awayScore) {
                gameStatus = WIN;
            } else if (myTeamScore < awayScore) {
                gameStatus = LOSE;
            } else {
                gameStatus = DRAW;
            }
        } else {
            if (game.getGameDate().isAfter(LocalDate.now())) {
                gameStatus = SCHEDULED;
            } else {
                gameStatus = OFF;
            }
        }

        return ScheduleDto.builder()
                .gameDate(game.getGameDate())
                .startTime(game.getStartTime())
                .opponentTeamLogo(isHome ? game.getAwayTeamLogo() : game.getHomeTeamLogo())
                .gameStatus(gameStatus)
                .region(game.getRegion())
                .isHome(isHome)
                .build();
    }
}