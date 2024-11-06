package yare.yare.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.service.MemberService;
import yare.yare.global.dto.ResponseDto;
import yare.yare.global.jwt.service.JwtService;

import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final JwtService jwtService;
    private final MemberService memberService;

    @GetMapping("/members")
    public ResponseEntity<?> memberDetails() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        MemberDetailsRes result = memberService.getMemberDetails(memberId);

        return ResponseDto.success(OK, result);
    }
}
