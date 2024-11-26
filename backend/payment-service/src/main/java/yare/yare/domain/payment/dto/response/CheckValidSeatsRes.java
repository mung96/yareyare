package yare.yare.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckValidSeatsRes {
    private String idempotencyKey;

    private Boolean isValid;

    public static CheckValidSeatsRes isValid(String idempotencyKey) {
        return CheckValidSeatsRes.builder()
                .idempotencyKey(idempotencyKey)
                .isValid(Boolean.TRUE)
                .build();
    }

    public static CheckValidSeatsRes isInValid(String idempotencyKey) {
        return CheckValidSeatsRes.builder()
                .idempotencyKey(idempotencyKey)
                .isValid(Boolean.FALSE)
                .build();
    }
}
