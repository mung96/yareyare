package yare.yare.dto;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import yare.yare.statuscode.ErrorCode;

@Getter
public class ResponseDto<T> extends ResponseEntity<ResponseData<T>> {
    public ResponseDto(HttpStatus status, String message) {
        super(new ResponseData<>(new ResponseHeader(message), null), status);
    }

    public static <T> ResponseDto<T> fail(ErrorCode e) {
        return new ResponseDto<>(HttpStatus.valueOf(e.getHttpStatusCode()), e.getMessage());
    }

    public static <T> ResponseDto<T> fail(String errorMessage) {
        return new ResponseDto<>(HttpStatus.BAD_REQUEST, errorMessage);
    }
}