package yare.yare.domain.member.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.member.dto.request.MyTeamModifyReq;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.dto.response.MyTeamModifyRes;
import yare.yare.domain.member.service.MemberService;
import yare.yare.global.dto.ResponseDto;
import yare.yare.global.jwt.service.JwtService;

import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final JwtService jwtService;
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<?> memberDetails() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        MemberDetailsRes result = memberService.getMemberDetails(memberId);

        return ResponseDto.success(OK, result);
    }

    @PatchMapping("/my-team")
    public ResponseEntity<?> myTeamModify(@RequestBody @Valid MyTeamModifyReq myTeamModifyReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        MyTeamModifyRes result = memberService.modifyMyTeam(memberId, myTeamModifyReq);

        return ResponseDto.success(OK, result);
    }
}
