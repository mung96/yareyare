package yare.yare.domain.game.dto;

import lombok.Data;

@Data
public class ResultDto {

    private Integer homeTeamScore;

    private String homeTeamLogo;

    private Integer awayTeamScore;

    private String awayTeamLogo;
}