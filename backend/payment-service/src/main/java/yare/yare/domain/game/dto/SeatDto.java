package yare.yare.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.history.entity.PurchaseHistory;
import yare.yare.domain.history.entity.SeatHistory;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatDto {
    private Long seatId;

    private String sectionName;

    private String rowName;

    private Integer seatNo;

    public SeatHistory toEntity(Integer unitPrice, PurchaseHistory purchaseHistory) {
        return SeatHistory.builder()
                .seatId(seatId)
                .unitPrice(unitPrice)
                .sectionName(sectionName)
                .rowName(rowName)
                .seatNo(seatNo)
                .purchaseHistory(purchaseHistory)
                .build();
    }
}
