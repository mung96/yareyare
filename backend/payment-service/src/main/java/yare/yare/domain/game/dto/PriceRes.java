package yare.yare.domain.game.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class PriceRes {
    private Header header;

    private Body body;

    public static class Header {
        private String message;
    }

    @Getter
    public static class Body {
        private Integer price;
    }
}
