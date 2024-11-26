package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.Game;

import java.util.List;

@Data
@Builder
public class ScheduleListRes {

    List<ScheduleDto> schedules;

    public static ScheduleListRes of(List<Game> games, Integer teamId) {
        return ScheduleListRes.builder()
                .schedules(games.stream().map((game) ->
                        ScheduleDto.of(game, teamId)
                ).toList())
                .build();
    }
}