package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GradeDto {

    private Integer gradeId;

    private String gradeName;

    private Integer availableSeats;
}