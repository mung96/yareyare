package yare.yare.domain.price_option.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PricePK implements Serializable {

    private Integer gradeId;

    private Integer seasonId;

    private Integer categoryId;
}
