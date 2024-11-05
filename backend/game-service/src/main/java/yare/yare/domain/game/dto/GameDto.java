package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
public class GameDto {

    private Long gameId;

    private LocalDate gameDate;

    private LocalTime startTime;

    private String stadiumName;

    private String homeTeamName;

    private String homeTeamLogo;

    private String awayTeamName;

    private String awayTeamLogo;

    private LocalDateTime ticketOpenTime;
}
