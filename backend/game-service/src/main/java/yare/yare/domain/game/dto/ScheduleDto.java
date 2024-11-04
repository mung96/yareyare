package yare.yare.domain.game.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ScheduleDto {

    private LocalDate gameDate;

    private LocalTime startTime;

    private String opponentTeamLogo;

    private Boolean isWin;
}