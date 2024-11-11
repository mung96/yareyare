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
public class ReservationListRes {
    private SliceDto<TicketDto> tickets;

    public static ReservationListRes toDto(SliceDto<TicketDto> tickets) {
        return ReservationListRes.builder()
                .tickets(tickets)
                .build();
    }
}
