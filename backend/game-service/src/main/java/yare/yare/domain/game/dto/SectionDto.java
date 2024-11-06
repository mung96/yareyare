package yare.yare.domain.game.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.game.entity.GameSeat;

import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@Data
@Builder
public class SectionDto {

    private String sectionName;

    private List<RowDto> rows;

    public static SectionDto toDto(Entry<String, List<GameSeat>> entry) {

        return SectionDto.builder()
                .sectionName(entry.getKey())
                .rows(entry.getValue().stream()
                        .collect(Collectors.groupingBy(GameSeat::getRowName))
                        .entrySet().stream()
                        .map(RowDto::toDto)
                        .toList())
                .build();
    }
}