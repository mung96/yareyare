package yare.yare.global.oauth.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import yare.yare.domain.member.entity.Member;
import yare.yare.domain.member.repository.MemberRepository;
import yare.yare.global.jwt.entity.JwtRedis;
import yare.yare.global.jwt.service.JwtService;
import yare.yare.global.oauth.PrincipalDetails;
import yare.yare.global.utils.RedisUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

import static yare.yare.domain.member.entity.Role.ROLE_USER;

@Slf4j
@Component
@RequiredArgsConstructor
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Value("${FRONT_URL}")
    private String frontUrl;

    private final JwtService jwtService;
    private final RedisUtils redisUtils;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("성공성공!!");

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String email = principalDetails.getMember().getEmail();
        String providerType = principalDetails.getMember().getProviderType();

        Member member = memberRepository.findByEmailAndProviderType(
                email,
                providerType
        );

        if(member == null) {
            member = Member.builder()
                    .uuid(UUID.randomUUID().toString())
                    .email(email)
                    .ipv4Address(request.getRemoteAddr())
                    .role(ROLE_USER)
                    .providerType(providerType)
                    .isDeleted(false)
                    .isCertificated(false)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            memberRepository.save(member);

            sendAccessToken(response, member);
        } else {
            if(Objects.equals(((PrincipalDetails) authentication.getPrincipal()).getMember().getProviderType(), member.getProviderType()) && !member.getIsDeleted()){
                sendAccessToken(response, member);
            } else{
                response.sendRedirect(frontUrl + "signup/error?providerType=" + member.getProviderType());
            }
        }
    }

    // 기존 회원 정보가 있는 경우 UUID 기반 accessToken 반환
    public void sendAccessToken(HttpServletResponse response, Member member) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);

            String uuid = member.getUuid();
            JwtRedis jwtRedis = JwtRedis.builder()
                    .uuid(uuid)
                    .memberId(member.getId())
                    .refreshToken(jwtService.createRefreshToken(uuid))
                    .build();
            redisUtils.setData(uuid, jwtRedis);

            String accessToken = jwtService.createAccessToken(uuid, member.getIsCertificated());

            response.sendRedirect(frontUrl + "exist?token=" + accessToken);
        }
    }
}
