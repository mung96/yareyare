package yare.yare.global.jwt.filter;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;
import yare.yare.domain.member.entity.Role;
import yare.yare.global.dto.ResponseDto;
import yare.yare.global.exception.CustomException;
import yare.yare.global.jwt.entity.JwtRedis;
import yare.yare.global.jwt.service.JwtService;
import yare.yare.global.statuscode.ErrorCode;
import yare.yare.global.utils.RedisUtils;

import java.io.IOException;

import static yare.yare.global.statuscode.ErrorCode.EXPIRED_TOKEN;
import static yare.yare.global.statuscode.ErrorCode.NOT_VALID_TOKEN;
import static yare.yare.global.statuscode.SuccessCode.OK;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtBearerAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final RedisUtils redisUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JWT 토큰 필터 시작!");

        String token = extractBearerToken(request);

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token_type = jwtService.getTypeFromToken(token);

        if (token_type == null) {
            sendError(response, NOT_VALID_TOKEN);
            return;
        } else if (token_type.equals("access_token")) {
            if (jwtService.isTokenValid(token)) {
                if(redisUtils.getData("token_" + token) != null) {
                    throw new CustomException(EXPIRED_TOKEN);
                }

                String uuid = jwtService.getUuid(token);
                JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(uuid);
                String refreshToken = jwtRedis.getRefreshToken();

                if(redisUtils.getData("refresh_token_"+refreshToken) != null) {
                    throw new CustomException(EXPIRED_TOKEN);
                }

                Authentication auth = jwtService.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else if (jwtService.isTokenExpired(token)) {
                String uuid = jwtService.getUuid(token);
                JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(uuid);
                if (jwtRedis != null) {
                    String refreshToken = jwtRedis.getRefreshToken();
                    if (jwtService.isTokenExpired(refreshToken)) {
                        redisUtils.deleteData(uuid);
                        sendError(response, EXPIRED_TOKEN);
                        return;
                    } else {
                        String memberId = JWT.decode(token).getSubject();
                        Boolean isCertificated = jwtService.getIsCertificatedFromToken(token);
                        Role role = jwtService.getRoleFromToken(token);
                        sendAccessToken(response, memberId, isCertificated, role);
                        return;
                    }
                }
                sendError(response, EXPIRED_TOKEN);
                return;
            } else {
                sendError(response, NOT_VALID_TOKEN);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private void sendAccessToken(HttpServletResponse response, String uuid, Boolean isCertificated, Role role) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);

            String token = jwtService.createAccessToken(uuid, isCertificated, role);

            ResponseDto<?> res = ResponseDto.success(OK, token);
            ObjectMapper mapper = new ObjectMapper();
            response.getWriter().write(mapper.writeValueAsString(res));
        }
    }

    private void sendError(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(errorCode.getHttpStatusCode());

            ResponseDto<Object> res = ResponseDto.fail(errorCode);
            ObjectMapper mapper = new ObjectMapper();
            response.getWriter().write(mapper.writeValueAsString(res));
        }
    }

    private String extractBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
