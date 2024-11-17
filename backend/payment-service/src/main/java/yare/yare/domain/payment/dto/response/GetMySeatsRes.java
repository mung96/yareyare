package yare.yare.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.payment.dto.SectionShapeDto;
import yare.yare.domain.payment.entity.PurchasedSeat;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class GetMySeatsRes {
    private List<SectionShapeDto> sections;

    public GetMySeatsRes(List<PurchasedSeat> seats) {
        sections = seats.stream().collect(Collectors.groupingBy(PurchasedSeat::getSectionName))
                .entrySet().stream().map(
                        entry -> new SectionShapeDto(entry.getKey(), entry.getValue())
                )
                .sorted(Comparator.comparing(SectionShapeDto::getSectionName))
                .toList();
    }
}
