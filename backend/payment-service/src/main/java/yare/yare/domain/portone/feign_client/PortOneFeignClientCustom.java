package yare.yare.domain.portone.feign_client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.portone.dto.PortOnePriceRes;
import yare.yare.domain.portone.dto.PortOneRefreshTokenReq;
import yare.yare.domain.portone.dto.PortOneTokenReq;
import yare.yare.domain.portone.dto.PortOneTokenRes;

@FeignClient(name = "portOneFeignClientCustom", url = "https://api.portone.io")
public interface PortOneFeignClientCustom {
    @PostMapping(value = "/login/api-secret", consumes = MediaType.APPLICATION_JSON_VALUE)
    PortOneTokenRes getToken(@RequestBody PortOneTokenReq request);

    @PostMapping(value = "/token/refresh", consumes = MediaType.APPLICATION_JSON_VALUE)
    PortOneTokenRes refreshToken(@RequestBody PortOneRefreshTokenReq request);

    @GetMapping(value = "/payments/{paymentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    PortOnePriceRes getPrice(@PathVariable("paymentId") String paymentId, @RequestHeader("Authorization") String authorization);
}
