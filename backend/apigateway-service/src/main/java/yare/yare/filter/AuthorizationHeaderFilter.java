package yare.yare.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import yare.yare.exception.CustomException;
import yare.yare.utils.RedisUtils;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

import static yare.yare.statuscode.ErrorCode.*;

@Slf4j
@Component
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    private final RedisUtils redisUtils;

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;

    public AuthorizationHeaderFilter(RedisUtils redisUtils) {
        super(Config.class);
        this.redisUtils = redisUtils;
    }

    public static class Config {}

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new CustomException(NO_AUTHORIZATION_HEADER);
            }

            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String jwt = authorizationHeader.replace("Bearer ", "");

            if (!isJwtValid(jwt)) {
                throw new CustomException(INVALID_TOKEN);
            }

            if(isExpiredToken(jwt)) {
                throw new CustomException(EXPIRED_TOKEN);
            }

            return chain.filter(exchange);
        };
    }

    private boolean isJwtValid(String jwt) {
        SecretKey signingKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA512");
        log.info("isJwtValid %{}", signingKey);

        try {
            String subject = Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody()
                    .getSubject();

            return subject != null && !subject.isEmpty();

        } catch (Exception ex) {
            log.error("JWT token is invalid", ex);
            return false;
        }
    }

    private boolean isExpiredToken(String jwt) {
        return redisUtils.getData("token_" + jwt) != null;
    }
}
