package yare.yare.domain.game.dto;

import lombok.Data;

@Data
public class GradeDto {

    private Integer gradeId;

    private String gradeName;

    private Integer availableSeats;
}