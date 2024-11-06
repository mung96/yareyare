package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.GameSeat;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class SeatListRes {

    private List<SectionDto> sections;

    public static SeatListRes toDto(List<GameSeat> gameSeats) {

        return SeatListRes.builder()
                .sections(gameSeats.stream()
                        .collect(Collectors.groupingBy(GameSeat::getSectionName))
                        .entrySet().stream()
                        .map(SectionDto::toDto)
                        .toList())
                .build();
    }
}