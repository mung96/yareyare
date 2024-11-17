package yare.yare.global.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {
    public String getMemberUuid(String token) {

        token = token.replace("Bearer ", "");
        DecodedJWT decoded = JWT.decode(token);

        return decoded.getSubject();
    }
}

