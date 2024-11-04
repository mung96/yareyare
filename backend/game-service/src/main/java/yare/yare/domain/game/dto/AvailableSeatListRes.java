package yare.yare.domain.game.dto;

import lombok.Data;

import java.util.List;

@Data
public class AvailableSeatListRes {

    private List<GradeDto> grades;
}