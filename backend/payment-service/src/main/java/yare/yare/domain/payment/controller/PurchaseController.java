package yare.yare.domain.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;
import yare.yare.domain.payment.service.PurchaseService;
import yare.yare.global.dto.ResponseDto;

import static yare.yare.global.statuscode.SuccessCode.CREATED;
import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseDto<Void> purchaseAdd(@RequestBody PurchaseAddReq purchaseAddReq) {

        return ResponseDto.success(CREATED, null);
    }

    @GetMapping("/tickets/purchases")
    public ResponseDto<?> reservationList(@RequestParam(value = "lastPurchaseId", required = false) Long lastPurchaseId,
                                          @PageableDefault(size = 10) Pageable pageable) {
        Long memberId = 1L;

        ReservationListRes result = purchaseService.reservationList(memberId, lastPurchaseId, pageable);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/tickets/cancellations")
    public ResponseDto<?> cancelReservationList(@RequestParam(value = "lastPurchaseId", required = false) Long lastPurchaseId,
                                                @PageableDefault(size = 10) Pageable pageable) {
        Long memberId = 1L;

        CancelReservationListRes result = purchaseService.cancelReservationList(memberId, lastPurchaseId, pageable);

        return ResponseDto.success(OK, result);
    }
}
