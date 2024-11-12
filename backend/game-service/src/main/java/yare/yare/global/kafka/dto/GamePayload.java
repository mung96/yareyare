package yare.yare.global.kafka.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
@Builder
public class GamePayload {

    private Long gameId;

    private String seasonName;

    private String awayTeamName;

    private String homeTeamName;

    private String stadiumName;

    private LocalDate gameDate;

    private LocalTime startTime;
}
