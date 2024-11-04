package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SectionDto {

    private String sectionName;

    private List<RowDto> rows;
}