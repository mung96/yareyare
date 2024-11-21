package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class GradeDto implements Serializable {

    private Integer gradeId;

    private String gradeName;

    private Long availableSeats;
}