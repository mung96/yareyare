package yare.yare.domain.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.payment.dto.request.CheckValidSeatsReq;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.CheckValidSeatsRes;
import yare.yare.domain.payment.dto.response.PurchaseDetailsRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;
import yare.yare.domain.payment.service.PurchaseService;
import yare.yare.global.auth.JwtTokenService;
import yare.yare.global.dto.ResponseDto;

import static yare.yare.global.statuscode.SuccessCode.CREATED;
import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;
    private final JwtTokenService jwtTokenService;

    @PostMapping
    public ResponseDto<Void> purchaseAdd(@RequestHeader("Authorization") String token,
                                         @RequestBody PurchaseAddReq purchaseAddReq) {
        String memberUuid = jwtTokenService.getMemberUuid(token);

        purchaseService.addPurchase(purchaseAddReq, memberUuid);

        return ResponseDto.success(CREATED, null);
    }

    @GetMapping("/tickets/purchases")
    public ResponseDto<ReservationListRes> reservationList(@RequestHeader("Authorization") String token,
                                                           @RequestParam(value = "lastPurchaseId", required = false) Long lastPurchaseId,
                                                           @PageableDefault(size = 10) Pageable pageable) {
        String memberUuid = jwtTokenService.getMemberUuid(token);

        ReservationListRes result = purchaseService.reservationList(memberUuid, lastPurchaseId, pageable);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/tickets/cancellations")
    public ResponseDto<CancelReservationListRes> cancelReservationList(@RequestHeader("Authorization") String token,
                                                                       @RequestParam(value = "lastPurchaseId", required = false) Long lastPurchaseId,
                                                                       @PageableDefault(size = 10) Pageable pageable) {
        String memberUuid = jwtTokenService.getMemberUuid(token);

        CancelReservationListRes result = purchaseService.cancelReservationList(memberUuid, lastPurchaseId, pageable);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/check")
    public ResponseDto<CheckValidSeatsRes> checkValidSeats(@ModelAttribute CheckValidSeatsReq checkValidSeatsReq) {
        CheckValidSeatsRes result = purchaseService.checkValidSeats(checkValidSeatsReq);

        return ResponseDto.success(OK, result);
    }

    @GetMapping("/tickets/{purchaseId}")
    public ResponseDto<PurchaseDetailsRes> purchaseDetails(@RequestHeader("Authorization") String token,
                                                           @PathVariable Long purchaseId) {
        String memberUuid = jwtTokenService.getMemberUuid(token);

        PurchaseDetailsRes result = purchaseService.purchaseDetails(memberUuid, purchaseId);

        return ResponseDto.success(OK, result);
    }
}
