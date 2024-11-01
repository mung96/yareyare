package yare.yare.domain.price_option.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "season_id", columnDefinition = "TINYINT")
    private Integer id;

    @NotNull
    @Column(columnDefinition = "TINYINT")
    private Integer year;

    @NotNull
    @Column(length = 50)
    private String name;
}
