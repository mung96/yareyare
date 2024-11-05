package yare.yare.global.oauth.userInfo;

import java.util.Map;

public class GoogleUserInfo implements Oauth2UserInfo {
    private Map<String, Object> attributes; //getAttributes()

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return (String)attributes.get("sub");
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
}
