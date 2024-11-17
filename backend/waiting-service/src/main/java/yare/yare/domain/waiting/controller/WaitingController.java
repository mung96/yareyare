package yare.yare.domain.waiting.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.waiting.dto.JoinQueueReq;
import yare.yare.domain.waiting.service.WaitingService;
import yare.yare.global.dto.ResponseDto;
import yare.yare.global.jwt.JwtTokenService;

import static yare.yare.global.statuscode.SuccessCode.CREATED;

@RestController
@RequestMapping("/api/waiting")
@RequiredArgsConstructor
public class WaitingController {

    private final WaitingService waitingService;
    private final JwtTokenService jwtTokenService;

    @PostMapping("/join")
    public ResponseDto<Void> joinQueue(
            @RequestHeader("Authorization") String token,
            @RequestBody JoinQueueReq joinQueueReq) {

        String memberId = jwtTokenService.getMemberUuid(token);
        waitingService.joinQueue(memberId, joinQueueReq, "1111");

        return ResponseDto.success(CREATED);
    }
}
