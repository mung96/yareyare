package yare.yare.domain.stadium.dto;

import lombok.Data;
import yare.yare.domain.stadium.entity.Seat;

import java.util.List;

@Data
public class RowShapeDto {

    private String rowName;

    private List<Integer> columns;

    public RowShapeDto(String rowName, List<Seat> seats) {
        this.rowName = rowName;
        this.columns = seats.stream().map(Seat::getSeatNumber).toList();
    }
}
