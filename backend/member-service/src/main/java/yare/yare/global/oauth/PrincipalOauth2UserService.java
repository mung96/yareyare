package yare.yare.global.oauth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import yare.yare.domain.member.entity.Member;
import yare.yare.global.oauth.userInfo.GoogleUserInfo;
import yare.yare.global.oauth.userInfo.KakaoUserInfo;
import yare.yare.global.oauth.userInfo.NaverUserInfo;
import yare.yare.global.oauth.userInfo.Oauth2UserInfo;

import java.util.Map;

import static yare.yare.domain.member.entity.Role.ROLE_USER;

@Service
@Slf4j
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Oauth2UserInfo oAuth2UserInfo = null;

        log.info("loadUser !!!!");

        if(userRequest.getClientRegistration().getRegistrationId().equals("google")){
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
            log.info("google user");
        } else if(userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
            log.info("naver user");
        } else if(userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
            log.info("kakao user");
        } else {
            log.info("error user");
            return oAuth2User;
        }

        String provider = oAuth2UserInfo.getProvider();
        String email = oAuth2UserInfo.getEmail();

        Member member = Member.builder()
                .email(email)
                .providerType(provider)
                .role(ROLE_USER)
                .build();

        log.info("end userService");

        return new PrincipalDetails(member, oAuth2User.getAttributes());
    }
}
