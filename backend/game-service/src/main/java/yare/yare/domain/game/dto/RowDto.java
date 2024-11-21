package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.GameSeat;

import java.util.List;
import java.util.Map.Entry;

@Data
@Builder
public class RowDto {

    private String rowName;

    private List<SeatDto> seats;

    public static RowDto toDto(Entry<String, List<GameSeat>> entry) {

        return RowDto.builder()
                .rowName(entry.getKey())
                .seats(entry.getValue().stream().map(SeatDto::toDto).toList())
                .build();
    }
}