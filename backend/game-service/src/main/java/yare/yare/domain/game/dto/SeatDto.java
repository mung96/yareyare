package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeatDto {

    private Long seatId;

    private Integer seatNumber;

    private Boolean isAvailable;
}