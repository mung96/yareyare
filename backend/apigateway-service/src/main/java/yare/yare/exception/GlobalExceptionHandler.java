package yare.yare.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import yare.yare.dto.ResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    protected ResponseDto<?> handleException(Exception e) {
        return ResponseDto.fail(e.getMessage());
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseDto<?> handleCustomException(CustomException e) {
        return ResponseDto.fail(e.getErrorCode());
    }
}
