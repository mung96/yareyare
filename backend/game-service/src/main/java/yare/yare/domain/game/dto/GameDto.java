package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.Game;

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

    public static GameDto toDto(Game game) {

        return GameDto.builder()
                .gameId(game.getId())
                .gameDate(game.getGameDate())
                .startTime(game.getStartTime())
                .stadiumName(game.getStadiumName())
                .homeTeamName(game.getHomeTeamName())
                .homeTeamLogo(game.getHomeTeamLogo())
                .awayTeamName(game.getAwayTeamName())
                .awayTeamLogo(game.getAwayTeamLogo())
                .ticketOpenTime(game.getTicketOpenTime())
                .build();
    }
}
