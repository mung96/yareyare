package yare.yare.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.member.dto.request.MyTeamModifyReq;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.dto.response.MyTeamModifyRes;
import yare.yare.domain.member.entity.Member;
import yare.yare.domain.member.repository.MemberRepository;
import yare.yare.domain.team.dto.TeamDto;
import yare.yare.domain.team.dto.response.TeamListRes;
import yare.yare.domain.team.feign_client.TeamFeignClientCustom;
import yare.yare.global.exception.CustomException;

import java.util.List;

import static yare.yare.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;
import static yare.yare.global.statuscode.ErrorCode.TEAM_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final TeamFeignClientCustom teamFeignClientCustom;

    @Override
    @Transactional(readOnly = true)
    public MemberDetailsRes getMemberDetails(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        return MemberDetailsRes.toDto(member);
    }

    @Override
    public MyTeamModifyRes modifyMyTeam(Long memberId, MyTeamModifyReq myTeamModifyReq) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        String myTeamName = teamFeignClientCustom.teamList().getTeams().stream()
                .filter(teamDto -> teamDto.getTeamId().equals(myTeamModifyReq.getTeamId()))
                .map(TeamDto::getTeamName)
                .findFirst()
                .orElseThrow(() -> new CustomException(TEAM_NOT_FOUND));

        member.updateMyTeamId(myTeamModifyReq.getTeamId());
        member.updateMyTeamName(myTeamName);

        return MyTeamModifyRes.toDto(member);
    }
}
