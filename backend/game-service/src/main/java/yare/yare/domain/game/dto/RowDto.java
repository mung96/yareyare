package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RowDto {

    private String rowName;

    private List<SeatDto> seats;
}