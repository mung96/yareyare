package yare.yare.global.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {
    public String getMemberUuid(String token) {

        DecodedJWT decoded = JWT.decode(token.substring(7));

        return decoded.getSubject();
    }
}

