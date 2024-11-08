package yare.yare.domain.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.global.dto.ResponseDto;

import static yare.yare.global.statuscode.SuccessCode.CREATED;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PurchaseController {
    @PostMapping
    public ResponseDto<Void> purchaseAdd(@RequestBody PurchaseAddReq purchaseAddReq) {

        return ResponseDto.success(CREATED, null);
    }
}
