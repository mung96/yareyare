package yare.yare.domain.game.dto;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class SeatInfoRes {
    private Header header;

    private Body body;

    public static class Header {
        private String message;
    }

    @Getter
    public static class Body {
        private Integer price;
        private Long gradeId;
        private String gradeName;

        private List<SeatDto> seats;
    }
}
