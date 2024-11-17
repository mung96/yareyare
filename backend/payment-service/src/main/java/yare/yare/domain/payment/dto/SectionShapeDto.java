package yare.yare.domain.payment.dto;

import lombok.Data;
import yare.yare.domain.payment.entity.PurchasedSeat;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class SectionShapeDto {
    private String sectionName;

    private List<RowShapeDto> rows;

    public SectionShapeDto(String sectionName, List<PurchasedSeat> seats) {

        this.sectionName = sectionName;

        this.rows = seats.stream()
                .collect(Collectors.groupingBy(PurchasedSeat::getRowName))
                .entrySet().stream()
                .map(
                        entry -> new RowShapeDto(entry.getKey(), entry.getValue())
                ).toList();
    }

}
