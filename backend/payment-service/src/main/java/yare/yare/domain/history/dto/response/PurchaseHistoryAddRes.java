package yare.yare.domain.history.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryAddRes {
    private String idempotencyKey;

    private Integer totalPrice;

}
