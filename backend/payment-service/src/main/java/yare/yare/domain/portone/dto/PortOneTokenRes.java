package yare.yare.domain.portone.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class PortOneTokenRes {
    private Response response;

    @Getter
    public static class Response {
        private String access_token;
        private String refresh_token;
    }
}