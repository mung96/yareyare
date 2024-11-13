package yare.yare.domain.history.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.history.dto.request.PurchaseHistoryAddReq;
import yare.yare.domain.history.dto.response.PurchaseHistoryAddRes;
import yare.yare.domain.history.service.PurchaseHistoryService;
import yare.yare.global.auth.JwtTokenService;
import yare.yare.global.dto.ResponseDto;

import static yare.yare.global.statuscode.SuccessCode.CREATED;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PurchaseHistoryController {
    private final PurchaseHistoryService purchaseHistoryService;
    private final JwtTokenService jwtTokenService;

    @PostMapping("/history")
    public ResponseDto<PurchaseHistoryAddRes> purchaseHistoryAdd(@RequestHeader("Authorization") String token,
                                             @RequestBody PurchaseHistoryAddReq purchaseHistoryAddReq) {
        String memberUuid = jwtTokenService.getMemberUuid(token);

        PurchaseHistoryAddRes result = purchaseHistoryService.addPurchaseHistory(purchaseHistoryAddReq, memberUuid);

        return ResponseDto.success(CREATED, result);
    }
}
