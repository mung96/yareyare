package yare.yare.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    BAD_REQUEST(400, "Bad Request"),
    ;

    private final int httpStatusCode;

    private final String message;

}
