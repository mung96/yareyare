package yare.yare.domain.history.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.history.dto.SeatDto;
import yare.yare.domain.history.entity.PurchaseHistory;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryAddReq {
    private Long gameId;

    private String idempotencyKey;

    private List<SeatDto> seats;

    public PurchaseHistory toEntity(String memberUuid) {
        return PurchaseHistory.builder()
                .gameId(gameId)
                .memberUuid(memberUuid)
                .build();
    }
}
