package yare.yare.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.payment.dto.TicketDto;
import yare.yare.global.dto.SliceDto;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CancelReservationListRes {
    private SliceDto<TicketDto> tickets;

    public static CancelReservationListRes toDto(SliceDto<TicketDto> tickets) {
        return CancelReservationListRes.builder()
                .tickets(tickets)
                .build();
    }
}
