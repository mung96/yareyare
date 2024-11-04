package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.enums.GameStatus;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class ScheduleDto {

    private LocalDate gameDate;

    private LocalTime startTime;

    private String opponentTeamLogo;

    private GameStatus gameStatus;

    private String region;

    private Boolean isHome;
}