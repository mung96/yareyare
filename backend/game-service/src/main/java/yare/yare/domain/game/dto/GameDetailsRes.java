package yare.yare.domain.game.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class GameDetailsRes {

    private String seasonName;

    private String homeTeamName;

    private String awayTeamName;

    private LocalDate gameDate;

    private LocalTime startTime;

    private String stadiumName;
}