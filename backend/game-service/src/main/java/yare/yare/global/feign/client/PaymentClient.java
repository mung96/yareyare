package yare.yare.global.feign.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import yare.yare.global.feign.dto.PaymentValidationRes;

import java.util.List;

@FeignClient(name = "payment-service")
public interface PaymentClient {

    @GetMapping("/api/payments/check")
    PaymentValidationRes validatePayment(@RequestParam("idempotencyKey") String idempotencyKey,
                                         @RequestParam("gameId") Long gameId,
                                         @RequestParam("seatsId") List<Long> seatsId);

}
