package yare.yare.domain.stadium.dto;

import lombok.Data;
import yare.yare.domain.stadium.entity.Seat;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class StadiumShapeRes {

    private List<SectionShapeDto> sections;

    public StadiumShapeRes(List<Seat> seats) {

        sections = seats.stream().collect(Collectors.groupingBy(Seat::getSection))
                .entrySet().stream().map(
                        entry -> new SectionShapeDto(entry.getKey().getName(), entry.getValue())
                )
                .sorted(Comparator.comparing(SectionShapeDto::getSectionName))
                .toList();
    }
}
