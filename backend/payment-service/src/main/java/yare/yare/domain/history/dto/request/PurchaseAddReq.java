package yare.yare.domain.history.dto.request;

import lombok.Data;

@Data
public class PurchaseAddReq {
    private String idempotencyKey;

    private Integer totalPrice;
}
