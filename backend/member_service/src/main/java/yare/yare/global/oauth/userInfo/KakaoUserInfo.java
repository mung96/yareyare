package yare.yare.global.oauth.userInfo;

import java.util.Map;

public class KakaoUserInfo implements Oauth2UserInfo {
    private Map<String, Object> attributes; //getAttributes()

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return (String) ((Map<String, Object>)attributes.get("kakao_account")).get("email");
    }
}
