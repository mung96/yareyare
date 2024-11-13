package yare.yare.domain.history.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.history.entity.PurchaseHistory;
import yare.yare.domain.history.entity.SeatHistory;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatDto {
    private Long seatId;

    public static SeatHistory toEntity(Long seatId, Integer unitPrice, PurchaseHistory purchaseHistory) {
        return SeatHistory.builder()
                .seatId(seatId)
                .unitPrice(unitPrice)
                .purchaseHistory(purchaseHistory)
                .build();
    }
}
