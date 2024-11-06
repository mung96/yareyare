package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.enums.GameStatus;

import static yare.yare.domain.game.enums.GameStatus.*;

@Data
@Builder
public class ResultDto {

    private Integer homeTeamScore;

    private String homeTeamLogo;

    private Integer awayTeamScore;

    private String awayTeamLogo;

    private GameStatus gameStatus;

    public static ResultDto toDto(Game game) {

        GameStatus gameStatus;

        if (game.getIsFinished()) {
            if (game.getHomeScore() > game.getAwayScore()) {
                gameStatus = WIN;
            } else if (game.getHomeScore() < game.getAwayScore()) {
                gameStatus = LOSE;
            } else {
                gameStatus = DRAW;
            }
        } else {
            gameStatus = OFF;
        }

        return ResultDto.builder()
                .homeTeamScore(game.getHomeScore())
                .homeTeamLogo(game.getHomeTeamLogo())
                .awayTeamScore(game.getAwayScore())
                .awayTeamLogo(game.getAwayTeamLogo())
                .gameStatus(gameStatus)
                .build();
    }
}