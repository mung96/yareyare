package yare.yare.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.payment.dto.SeatInfoDto;
import yare.yare.domain.payment.entity.Game;
import yare.yare.domain.payment.entity.Purchase;

import java.util.List;

import static yare.yare.global.formatter.DateFormatter.*;
import static yare.yare.global.formatter.NumberFormatter.convertPriceFormat;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseDetailsRes {
    private String imageUrl;

    private String seasonName;

    private String homeTeamName;

    private String awayTeamName;

    private String stadiumName;

    private String gameDateTime;

    private String reservationDate;

    private String startTicketId;

    private String endTicketId;

    private Integer ticketCount;

    private String purchaseStatus;

    private String ticketType;

    private String seatPrice;

    private String chargePrice;

    private String totalPrice;

    private List<SeatInfoDto> seats;

    private String cancelDeadline;

    public static PurchaseDetailsRes toDto(Purchase purchase, Game game,
                                           String startTicketId, String endTicketId, Integer ticketCount,
                                           Integer seatPrice, Integer chargePrice, List<SeatInfoDto> seats) {
        return PurchaseDetailsRes.builder()
                .imageUrl("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/temp.png")
                .seasonName(game.getSeasonName())
                .homeTeamName(game.getHomeTeamName())
                .awayTeamName(game.getAwayTeamName())
                .stadiumName(game.getStadiumName())
                .gameDateTime(convertToDateTime(game.getGameDatetime()))
                .reservationDate(convertToReservationDate(purchase.getCreatedAt()))
                .startTicketId(startTicketId)
                .endTicketId(endTicketId)
                .ticketCount(ticketCount)
                .purchaseStatus(purchase.getCanceled() ? "취소완료" : "예매완료")
                .ticketType("모바일티켓")
                .seatPrice(convertPriceFormat(seatPrice))
                .chargePrice(convertPriceFormat(chargePrice))
                .totalPrice(convertPriceFormat(purchase.getTotalPrice()))
                .seats(seats)
                .cancelDeadline(calculateCancelDate(game.getGameDatetime()))
                .build();
    }
}
