package yare.yare.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND(404, "Not Found"),
    ;

    private final int httpStatusCode;

    private final String message;

}
