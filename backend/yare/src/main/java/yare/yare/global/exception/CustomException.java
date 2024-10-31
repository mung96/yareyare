package yare.yare.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import yare.yare.global.statuscode.ErrorCode;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
    ErrorCode errorCode;
}

