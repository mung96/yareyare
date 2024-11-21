package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.Game;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class LastGameListRes {

    private LocalDate gameDate;

    private List<ResultDto> results;

    public static LastGameListRes toDto(List<Game> games) {

        return LastGameListRes.builder()
                .gameDate(games.isEmpty() ? null : games.getFirst().getGameDate())
                .results(games.stream().map(ResultDto::toDto).toList())
                .build();
    }
}
