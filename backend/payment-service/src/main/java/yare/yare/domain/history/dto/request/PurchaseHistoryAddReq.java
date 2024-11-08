package yare.yare.domain.history.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.history.dto.SeatDto;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryAddReq {
    private Long gameId;

    private List<SeatDto> seats;
}
