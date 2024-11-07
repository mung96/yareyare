package yare.yare.domain.member.service;

import jakarta.validation.Valid;
import yare.yare.domain.member.dto.request.MyTeamModifyReq;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.dto.response.MyTeamModifyRes;

public interface MemberService {
    MemberDetailsRes getMemberDetails(Long memberId);

    MyTeamModifyRes modifyMyTeam(Long memberId, @Valid MyTeamModifyReq myTeamModifyReq);
}
