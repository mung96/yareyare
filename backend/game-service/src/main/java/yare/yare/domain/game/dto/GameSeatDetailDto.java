package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.GameSeat;

@Data
@Builder
public class GameSeatDetailDto {
    private Long seatId;
    private String sectionName;
    private String rowName;
    private Integer seatNo;

    public static GameSeatDetailDto toDto(GameSeat gameSeat) {
        return GameSeatDetailDto.builder()
                .seatId(gameSeat.getSeatId())
                .sectionName(gameSeat.getSectionName())
                .rowName(gameSeat.getRowName())
                .seatNo(gameSeat.getSeatNumber())
                .build();
    }

}
