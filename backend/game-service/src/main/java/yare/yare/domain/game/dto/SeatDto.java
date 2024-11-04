package yare.yare.domain.game.dto;

import lombok.Data;

@Data
public class SeatDto {

    private Long seatId;

    private Integer seatNumber;

    private Boolean isAvailable;
}