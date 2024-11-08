package yare.yare.domain.payment.dto.request;

import lombok.Data;

@Data
public class PurchaseAddReq {
    private String idempotencyKey;

    private Integer totalPrice;
}
