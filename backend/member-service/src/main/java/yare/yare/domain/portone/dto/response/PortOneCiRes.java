package yare.yare.domain.portone.dto.response;

import lombok.Data;
import lombok.Getter;

@Data
public class PortOneCiRes {
    private Response response;

    @Getter
    public static class Response {
        private String unique_key;

        private String name;

        private String birthday;

        private String phone;
    }
}
