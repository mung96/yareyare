package yare.yare.domain.history.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.history.entity.PurchaseHistory;
import yare.yare.domain.payment.entity.Game;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryAddReq {
    private Long gameId;

    private String idempotencyKey;

    private List<Long> seatIds;

    public PurchaseHistory toEntity(String memberUuid, Long gradeId, String gradeName, Game game) {
        return PurchaseHistory.builder()
                .game(game)
                .gradeName(gradeName)
                .gradeId(gradeId)
                .memberUuid(memberUuid)
                .idempotencyKey(idempotencyKey)
                .build();
    }
}
