package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.GameSeat;

@Data
@Builder
public class SeatDto {

    private Long seatId;

    private Integer seatNumber;

    private Boolean isAvailable;

    public static SeatDto toDto(GameSeat gameSeat) {

        return SeatDto.builder()
                .seatId(gameSeat.getSeatId())
                .seatNumber(gameSeat.getSeatNumber())
                .isAvailable(gameSeat.isAvailable())
                .build();
    }
}