package yare.yare.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    BAD_REQUEST(400, "Bad Request"),
    INVALID_TOKEN(401, "Invalid Token"),
    ;

    private final int httpStatusCode;

    private final String message;

}
