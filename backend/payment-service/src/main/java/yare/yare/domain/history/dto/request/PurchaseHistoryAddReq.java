package yare.yare.domain.history.dto.request;

import lombok.Data;
import yare.yare.domain.history.dto.SeatDto;

import java.util.List;

@Data
public class PurchaseHistoryAddReq {
    private Long gameId;

    private List<SeatDto> seats;
}
