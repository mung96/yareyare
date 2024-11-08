package yare.yare.domain.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.payment.dto.TicketDto;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;
import yare.yare.global.dto.ResponseDto;

import java.util.ArrayList;
import java.util.List;

import static yare.yare.global.statuscode.SuccessCode.CREATED;
import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PurchaseController {
    @PostMapping
    public ResponseDto<Void> purchaseAdd(@RequestBody PurchaseAddReq purchaseAddReq) {

        return ResponseDto.success(CREATED, null);
    }

    @GetMapping("/tickets/purchases")
    public ResponseDto<?> reservationList() {
        ReservationListRes result = new ReservationListRes();
        List<TicketDto> tickets = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            TicketDto ticket = TicketDto.builder()
                    .purchaseId((long) i)
                    .seasonName("2024 신한SOL뱅크 KBO 리그")
                    .awayTeamName("두산")
                    .homeTeamName("기아")
                    .reservationId("T327135"+(i+1))
                    .reservationDate("2024.06.08")
                    .stadiumName("잠실야구장")
                    .gameDateTime("2024.06.13(목) 18:30")
                    .cancelDeadline("2024.06.12(수) 23:59")
                    .purchaseStatus("예매완료")
                    .build();

            tickets.add(ticket);
        }

        result.setTickets(tickets);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/tickets/cancellations")
    public ResponseDto<?> cancelReservationList() {
        CancelReservationListRes result = new CancelReservationListRes();
        List<TicketDto> tickets = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            TicketDto ticket = TicketDto.builder()
                    .purchaseId((long) i)
                    .seasonName("2024 신한SOL뱅크 KBO 리그")
                    .awayTeamName("두산")
                    .homeTeamName("기아")
                    .reservationId("T327135"+(i+1))
                    .reservationDate("2024.06.08")
                    .stadiumName("잠실야구장")
                    .gameDateTime("2024.06.13(목) 18:30")
                    .cancelDeadline("2024.06.12(수) 23:59")
                    .purchaseStatus("취소완료")
                    .build();

            tickets.add(ticket);
        }

        result.setTickets(tickets);

        return ResponseDto.success(OK, result);
    }
}
