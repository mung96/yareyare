package yare.yare.domain.price_option.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yare.yare.domain.stadium.entity.Grade;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Price {

    @EmbeddedId
    private PricePK pricePK;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("gradeId")
    @JoinColumn(name = "grade_id", columnDefinition = "SMALLINT")
    private Grade grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("seasonId")
    @JoinColumn(name = "season_id", columnDefinition = "TINYINT")
    private Season season;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("categoryId")
    @JoinColumn(name = "category_id", columnDefinition = "TINYINT")
    private Category category;

    @NotNull
    private Integer price;
}
