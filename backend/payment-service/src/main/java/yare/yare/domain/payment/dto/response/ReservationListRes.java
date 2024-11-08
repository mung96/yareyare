package yare.yare.domain.payment.dto.response;

import lombok.Data;
import yare.yare.domain.payment.dto.TicketDto;

import java.util.List;

@Data
public class ReservationListRes {
    private List<TicketDto> tickets;
}
