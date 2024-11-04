package yare.yare.domain.game.dto;

import lombok.Data;

import java.util.List;

@Data
public class RowDto {

    private String rowName;

    private List<SeatDto> seats;
}