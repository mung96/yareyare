package yare.yare.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.payment.entity.Purchase;
import yare.yare.domain.payment.entity.PurchasedSeat;

import static yare.yare.global.formatter.NumberFormatter.convertPriceFormat;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatInfoDto {
    private String ticketId;

    private String gradeName;

    private String seatNo;

    private String unitPrice;

    public static SeatInfoDto toDto(Purchase purchase, PurchasedSeat purchasedSeat) {
        return SeatInfoDto.builder()
                .ticketId(purchasedSeat.getTicketUuid())
                .gradeName(purchase.getGradeName())
                .seatNo(convertSeatNo(purchasedSeat))
                .unitPrice(convertPriceFormat(purchasedSeat.getUnitPrice()))
                .build();
    }

    private static String convertSeatNo(PurchasedSeat purchasedSeat) {
        return purchasedSeat.getSectionName() + "구역 " + purchasedSeat.getRowName() + "열 " + purchasedSeat.getSeatNo();
    }
}