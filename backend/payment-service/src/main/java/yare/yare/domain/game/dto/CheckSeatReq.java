package yare.yare.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckSeatReq {
    private String idempotencyKey;

    private List<Long> seatIds;

    public static CheckSeatReq toDto(String idempotencyKey, List<Long> seatIds) {
        return CheckSeatReq.builder()
                .idempotencyKey(idempotencyKey)
                .seatIds(seatIds)
                .build();
    }
}
