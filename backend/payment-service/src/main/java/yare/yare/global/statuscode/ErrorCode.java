package yare.yare.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    CONFLICT_WITH_HISTORY(CONFLICT.value(), "다른 요청과 충돌이 발생했습니다. 잠시 후 다시 시도해주세요."),
    INVALID_IDEMPOTENCY_KEY(FORBIDDEN.value(), "유효하지 않은 멱등키입니다."),
    INVALID_SEAT(FORBIDDEN.value(), "다른사람이 선점한 좌석입니다."),
    CONFLICT_WITH_PURCHASE(CONFLICT.value(), "다른 요청과 충돌이 발생했습니다. 잠시 후 다시 시도해주세요."),
    NOT_FOUND_HISTORY(NOT_FOUND.value(), "등록되지 않은 결제 요청입니다."),
    INVALID_TOTAL_PRICE(BAD_REQUEST.value(), "결제 금액이 맞지 않습니다."),
    GAME_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 경기입니다."),
    PURCHASE_NOT_MINE(FORBIDDEN.value(), "권한이 없는 결제입니다")
    ;

    private final int httpStatusCode;

    private final String message;

}
