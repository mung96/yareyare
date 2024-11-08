package yare.yare.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
