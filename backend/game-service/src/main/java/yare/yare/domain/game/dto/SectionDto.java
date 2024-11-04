package yare.yare.domain.game.dto;

import lombok.Data;

import java.util.List;

@Data
public class SectionDto {

    private String sectionName;

    private List<RowDto> rows;
}