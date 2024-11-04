package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class LastGameListRes {

    private LocalDate gameDate;

    private List<ResultDto> results;
}
