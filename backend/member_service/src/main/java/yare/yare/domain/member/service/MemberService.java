package yare.yare.domain.member.service;

import yare.yare.domain.member.dto.response.MemberDetailsRes;

public interface MemberService {
    MemberDetailsRes getMemberDetails(Long memberId);
}
