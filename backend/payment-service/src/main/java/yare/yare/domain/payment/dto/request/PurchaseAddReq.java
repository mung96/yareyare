package yare.yare.domain.payment.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.history.entity.PurchaseHistory;
import yare.yare.domain.history.entity.SeatHistory;
import yare.yare.domain.payment.entity.Purchase;
import yare.yare.domain.payment.entity.PurchasedSeat;
import yare.yare.domain.payment.enums.Vendor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseAddReq {
    private String idempotencyKey;

    private Integer totalPrice;

    private String vendor;

    public Purchase toEntity(PurchaseHistory purchaseHistory) {
        return Purchase.builder()
                .memberUuid(purchaseHistory.getMemberUuid())
                .vendor(Vendor.valueOf(vendor.toUpperCase()))
                .idempotencyKey(idempotencyKey)
                .totalPrice(totalPrice)
                .game(purchaseHistory.getGame())
                .gradeId(purchaseHistory.getId())
                .gradeName(purchaseHistory.getGradeName())
                .build();
    }

    public PurchasedSeat toEntity(SeatHistory seatHistory) {
        return PurchasedSeat.builder()
                .sectionName(seatHistory.getSectionName())
                .rowName(seatHistory.getRowName())
                .seatNo(seatHistory.getSeatNo())
                .seatId(seatHistory.getSeatId())
                .unitPrice(seatHistory.getUnitPrice())
                .build();
    }
}
