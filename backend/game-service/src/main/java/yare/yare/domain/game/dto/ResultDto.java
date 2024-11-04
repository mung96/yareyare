package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.enums.GameStatus;

@Data
@Builder
public class ResultDto {

    private Integer homeTeamScore;

    private String homeTeamLogo;

    private Integer awayTeamScore;

    private String awayTeamLogo;

    private GameStatus gameStatus;
}