package yare.yare.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 토큰
    EXPIRED_TOKEN(400, "만료된 토큰입니다."),
    NOT_VALID_TOKEN(400, "유효하지 않은 토큰입니다."),

    // 포트원
    FAIL_PORTONE_TOKEN(400, "포트원 토큰 발급 실패했습니다."),
    FAIL_PORTONE_IDENTIFIED(400, "포트원 본인인증값을 가져올 수 없습니다."),

    // 멤버
    MEMBER_NOT_FOUND(400, "사용자를 찾을 수 없습니다."),
    TEAM_NOT_FOUND(400, "팀을 찾을 수 없습니다."),
    ;

    private final int httpStatusCode;

    private final String message;

}
