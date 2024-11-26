package yare.yare.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.payment.entity.PurchasedSeat;
import yare.yare.domain.payment.entity.Ticket;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketDetailDto {
    private String ticketId;

    private String src;

    public static Ticket toEntity(PurchasedSeat seat) {
        return Ticket.builder()
                .purchasedSeat(seat)
                .imgSrc("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/ticket.png")
                .build();
    }
}
