package yare.yare.domain.stadium.dto;

import lombok.Data;
import yare.yare.domain.stadium.entity.Seat;

import java.util.List;

@Data
public class RowShapeDto {

    private String rowName;

    private List<SeatShapeDto> seats;

    public RowShapeDto(String rowName, List<Seat> seats) {
        this.rowName = rowName;
        this.seats = seats.stream().map(Seat::getSeatNumber).map(SeatShapeDto::new).toList();
    }
}
