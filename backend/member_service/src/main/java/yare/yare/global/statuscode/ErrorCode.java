package yare.yare.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 토큰
    EXPIRED_TOKEN(400, "만료된 토큰입니다."),
    NOT_VALID_TOKEN(400, "유효하지 않은 토큰입니다."),
    ;

    private final int httpStatusCode;

    private final String message;

}
