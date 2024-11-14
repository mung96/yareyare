package yare.yare.domain.game.dto;

import lombok.Data;

import java.util.List;

@Data
public class GameSeatDetailListRes {
    private Integer price;
    private Integer gradeId;
    private String gradeName;
    private List<GameSeatDetailDto> seats;
}
