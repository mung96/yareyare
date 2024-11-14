package yare.yare.global.feign.dto;

import lombok.Data;

@Data
public class PaymentValidationRes {

    private Header header;

    private Body body;

    public static class Header {

    }

    @Data
    public static class Body {
        private String idempotencyKey;
        private Boolean isValid;

        public Boolean inValid() {
            return !isValid;
        }
    }

    public Boolean inValid() {
        return this.body.inValid();
    }


}
