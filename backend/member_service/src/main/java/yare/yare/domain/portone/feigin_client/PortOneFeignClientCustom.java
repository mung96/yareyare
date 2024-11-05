package yare.yare.domain.portone.feigin_client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.portone.dto.request.PortOneTokenReq;
import yare.yare.domain.portone.dto.response.PortOneCiRes;
import yare.yare.domain.portone.dto.response.PortOneTokenRes;

@FeignClient(name = "portOneFeignClientCustom", url = "https://api.iamport.kr")
public interface PortOneFeignClientCustom {
    @PostMapping(value = "/users/getToken", consumes = MediaType.APPLICATION_JSON_VALUE)
    PortOneTokenRes getToken(@RequestBody PortOneTokenReq request);

    @GetMapping(value = "/certifications/{imp_uid}", produces = MediaType.APPLICATION_JSON_VALUE)
    PortOneCiRes getCi(@PathVariable("imp_uid") String imp_uid, @RequestHeader("Authorization") String authorization);
}
