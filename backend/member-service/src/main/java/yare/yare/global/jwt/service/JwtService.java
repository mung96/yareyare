package yare.yare.global.jwt.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import yare.yare.domain.member.entity.Role;

public interface JwtService {
    String createAccessToken(String uuid, Boolean isCertificated, Role role);

    String createRefreshToken(String uuid);

    String getUuid(String token);

    Authentication getAuthentication(String accessToken);

    boolean isTokenValid(String token);

    boolean isTokenExpired(String token);

    Long getUserId(SecurityContext securityContext);

    Long getUserIdFromRedis(String uuid);

    String getTypeFromToken(String token);

    Boolean getIsCertificatedFromToken(String token);

    Role getRoleFromToken(String token);
}
