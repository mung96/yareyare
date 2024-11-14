package yare.yare.domain.game.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class CheckSeatRes {
    private Header header;

    private Body body;

    public static class Header {
        private String message;
    }

    @Getter
    public static class Body {

    }
}
