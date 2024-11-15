package yare.yare.domain.payment.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckValidSeatsReq {
    private String idempotencyKey;

    private Long gameId;

    private List<Long> seatsId;
}
