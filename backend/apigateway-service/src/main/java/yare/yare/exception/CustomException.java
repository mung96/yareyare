package yare.yare.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import yare.yare.statuscode.ErrorCode;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
    ErrorCode errorCode;
}
