package yare.yare.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NO_AUTHORIZATION_HEADER(UNAUTHORIZED.value(), "JWT 헤더가 누락됐습니다."),
    INVALID_TOKEN(UNAUTHORIZED.value(), "유효하지 않은 JWT 토큰입니다."),
    EXPIRED_TOKEN(FORBIDDEN.value(), "만료된 토큰입니다.")
    ;

    private final int httpStatusCode;

    private final String message;

}

