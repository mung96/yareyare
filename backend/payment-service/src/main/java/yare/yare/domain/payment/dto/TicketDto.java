package yare.yare.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static yare.yare.global.formatter.DateFormatter.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
    private Long purchaseId;

    private String seasonName;

    private String awayTeamName;

    private String homeTeamName;

    private String reservationId;

    private String reservationDate;

    private String stadiumName;

    private String gameDateTime;

    private String cancelDeadline;

    private String purchaseStatus;

    public TicketDto(Long purchaseId, String seasonName, String awayTeamName, String homeTeamName,
                     String reservationId, LocalDateTime createdAt, String stadiumName,
                     LocalDateTime gameDatetime, Boolean canceled) {
        this.purchaseId = purchaseId;
        this.seasonName = seasonName;
        this.awayTeamName = awayTeamName;
        this.homeTeamName = homeTeamName;
        this.reservationId = reservationId;
        this.reservationDate = convertToReservationDate(createdAt);
        this.stadiumName = stadiumName;
        this.gameDateTime = convertToDateTime(gameDatetime);
        this.cancelDeadline = calculateCancelDate(gameDatetime);
        this.purchaseStatus = canceled ? "취소완료" : "예매완료";
    }
}
