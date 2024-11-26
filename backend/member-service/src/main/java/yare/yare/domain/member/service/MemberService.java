package yare.yare.domain.member.service;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import yare.yare.domain.member.dto.request.MyTeamModifyReq;
import yare.yare.domain.member.dto.response.MemberAccessTokenRes;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.dto.response.MyTeamModifyRes;

public interface MemberService {
    MemberAccessTokenRes getAccessToken(String code);

    MemberDetailsRes getMemberDetails(Long memberId);

    MyTeamModifyRes modifyMyTeam(Long memberId, @Valid MyTeamModifyReq myTeamModifyReq);

    void logout(Authentication authentication);
}
