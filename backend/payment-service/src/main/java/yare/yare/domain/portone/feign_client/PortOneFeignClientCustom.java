package yare.yare.domain.portone.feign_client;


import jakarta.ws.rs.Path;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.portone.dto.*;

@FeignClient(name = "portOneFeignClientCustom", url = "https://api.portone.io")
public interface PortOneFeignClientCustom {
    @PostMapping(value = "/login/api-secret", consumes = MediaType.APPLICATION_JSON_VALUE)
    PortOneTokenRes getToken(@RequestBody PortOneTokenReq request);

    @PostMapping(value = "/token/refresh", consumes = MediaType.APPLICATION_JSON_VALUE)
    PortOneTokenRes refreshToken(@RequestBody PortOneRefreshTokenReq request);

    @GetMapping(value = "/payments/{paymentId}")
    PortOnePriceRes getPrice(@PathVariable("paymentId") String paymentId, @RequestHeader("Authorization") String authorization);

    @PostMapping(value = "/payments/{paymentId}/cancel")
    PortOneCancelRes cancelPayment(@PathVariable("paymentId") String paymentId,
                                   @RequestBody PortOneCancelReq request,
                                   @RequestHeader("Authorization") String authorization);
}
