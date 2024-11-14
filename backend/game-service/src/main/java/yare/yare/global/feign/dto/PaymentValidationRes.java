package yare.yare.global.feign.dto;

import lombok.Data;

@Data
public class PaymentValidationRes {

    private String idempotencyKey;

    private Boolean isValid;

    public Boolean inValid() {
        return !isValid;
    }
}
