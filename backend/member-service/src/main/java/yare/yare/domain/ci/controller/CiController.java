package yare.yare.domain.ci.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.ci.dto.request.CiAddReq;
import yare.yare.domain.ci.service.CiService;
import yare.yare.global.dto.ResponseDto;
import yare.yare.global.jwt.service.JwtService;

import static yare.yare.global.statuscode.SuccessCode.CREATED;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class CiController {
    private final JwtService jwtService;
    private final CiService ciService;

    @PostMapping("/authentication")
    public ResponseDto<Void> ciAdd(@RequestBody CiAddReq ciAddReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        ciService.addCi(ciAddReq, memberId);

        return ResponseDto.success(CREATED);
    }
}
