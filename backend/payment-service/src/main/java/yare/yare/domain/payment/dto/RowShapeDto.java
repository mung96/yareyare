package yare.yare.domain.payment.dto;

import lombok.Data;
import yare.yare.domain.payment.entity.PurchasedSeat;

import java.util.List;

@Data
public class RowShapeDto {
    private String rowName;

    private List<SeatShapeDto> seats;

    public RowShapeDto(String rowName, List<PurchasedSeat> seats) {
        this.rowName = rowName;
        this.seats = seats.stream().map(PurchasedSeat::getSeatNo).map(SeatShapeDto::new).toList();
    }
}
