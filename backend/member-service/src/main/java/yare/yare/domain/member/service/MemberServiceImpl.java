package yare.yare.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.member.dto.request.MyTeamModifyReq;
import yare.yare.domain.member.dto.response.MemberAccessTokenRes;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.dto.response.MyTeamModifyRes;
import yare.yare.domain.member.entity.Member;
import yare.yare.domain.member.repository.MemberRepository;
import yare.yare.domain.team.dto.TeamDto;
import yare.yare.domain.team.feign_client.TeamFeignClientCustom;
import yare.yare.global.exception.CustomException;
import yare.yare.global.jwt.entity.JwtRedis;
import yare.yare.global.jwt.service.JwtService;
import yare.yare.global.utils.RedisUtils;

import static yare.yare.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private final RedisUtils redisUtils;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final TeamFeignClientCustom teamFeignClientCustom;

    @Override
    @Transactional(readOnly = true)
    public MemberAccessTokenRes getAccessToken(String code) {
        Object token = redisUtils.getData(code);
        if(token == null) {
            throw new CustomException(NOT_VALID_CODE);
        }

        return new MemberAccessTokenRes((String) token);
    }

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

        String myTeamName = teamFeignClientCustom.teamList().getBody().getTeams().stream()
                .filter(teamDto -> teamDto.getTeamId().equals(myTeamModifyReq.getTeamId()))
                .map(TeamDto::getTeamName)
                .findFirst()
                .orElseThrow(() -> new CustomException(TEAM_NOT_FOUND));

        member.updateMyTeamId(myTeamModifyReq.getTeamId());
        member.updateMyTeamName(myTeamName);

        return MyTeamModifyRes.toDto(member);
    }

    @Override
    public void logout(Authentication authentication) {
        if (authentication != null && authentication.getCredentials() instanceof String) {
            String accessToken = (String) authentication.getCredentials();
            String uuid = jwtService.getUuid(accessToken);

            JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(uuid);
            String refreshToken = jwtRedis.getRefreshToken();

            redisUtils.setDataWithExpiration("token_" + accessToken, accessToken, 10800L);
            redisUtils.setDataWithExpiration("refresh_token_" + refreshToken, refreshToken, 259200L);
        }
    }
}
