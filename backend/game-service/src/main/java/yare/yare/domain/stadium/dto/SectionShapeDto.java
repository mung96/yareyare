package yare.yare.domain.stadium.dto;

import lombok.Data;
import yare.yare.domain.stadium.entity.Seat;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class SectionShapeDto {

    private String sectionName;

    private List<RowShapeDto> rows;

    public SectionShapeDto(String sectionName, List<Seat> seats) {

        this.sectionName = sectionName;

        this.rows = seats.stream()
                .collect(Collectors.groupingBy(Seat::getRowName))
                .entrySet().stream()
                .map(
                        entry -> new RowShapeDto(entry.getKey(), entry.getValue())
                ).toList();
    }
}
