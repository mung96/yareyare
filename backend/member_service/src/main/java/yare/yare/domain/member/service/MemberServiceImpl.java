package yare.yare.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.entity.Member;
import yare.yare.domain.member.repository.MemberRepository;
import yare.yare.global.exception.CustomException;

import static yare.yare.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    public MemberDetailsRes getMemberDetails(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        return MemberDetailsRes.toDto(member);
    }
}
