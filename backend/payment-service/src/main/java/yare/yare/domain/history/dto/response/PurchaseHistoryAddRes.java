package yare.yare.domain.history.dto.response;

import lombok.Data;

@Data
public class PurchaseHistoryAddRes {
    private String idempotencyKey;

    private Integer totalPrice;

}
