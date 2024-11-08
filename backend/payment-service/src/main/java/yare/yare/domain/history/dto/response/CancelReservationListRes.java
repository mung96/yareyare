package yare.yare.domain.history.dto.response;

import lombok.Data;
import yare.yare.domain.history.dto.TicketDto;

import java.util.List;

@Data
public class CancelReservationListRes {
    private List<TicketDto> tickets;
}
