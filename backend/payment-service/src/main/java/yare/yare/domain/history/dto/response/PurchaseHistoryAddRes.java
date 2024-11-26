package yare.yare.domain.history.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.history.entity.PurchaseHistory;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryAddRes {
    private Integer totalPrice;

    public static PurchaseHistoryAddRes toDto(PurchaseHistory history) {
        return PurchaseHistoryAddRes.builder()
                .totalPrice(history.getTotalPrice())
                .build();
    }
}
