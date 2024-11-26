package yare.yare.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.payment.dto.TicketDetailDto;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetTicketRes {
    List<TicketDetailDto> tickets;

    public static GetTicketRes toDto(List<TicketDetailDto> tickets) {
        return GetTicketRes.builder()
                .tickets(tickets)
                .build();
    }
}
