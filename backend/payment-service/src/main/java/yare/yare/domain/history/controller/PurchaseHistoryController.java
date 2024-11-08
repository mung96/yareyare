package yare.yare.domain.history.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.history.dto.request.PurchaseHistoryAddReq;
import yare.yare.domain.history.dto.response.PurchaseHistoryAddRes;
import yare.yare.global.dto.ResponseDto;

import static yare.yare.global.statuscode.SuccessCode.CREATED;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PurchaseHistoryController {
    @PostMapping("/history")
    public ResponseDto<?> purchaseHistoryAdd(@RequestBody PurchaseHistoryAddReq purchaseHistoryAddReq) {
        PurchaseHistoryAddRes result = PurchaseHistoryAddRes.builder()
                .idempotencyKey("a3df30a8-65e3-425a-a286-2b7877b8e61e")
                .totalPrice(23000)
                .build();

        return ResponseDto.success(CREATED, result);
    }
}
