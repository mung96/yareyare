package yare.yare.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    CONFLICT_WITH_HISTORY(CONFLICT.value(), "다른 요청과 충돌이 발생했습니다. 잠시 후 다시 시도해주세요."),
    INVALID_IDEMPOTENCY_KEY(FORBIDDEN.value(), "유효하지 않은 멱등키입니다."),
    INVALID_SEAT(FORBIDDEN.value(), "다른사람이 선점한 좌석입니다.")
    ;

    private final int httpStatusCode;

    private final String message;

}
