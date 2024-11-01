package yare.yare.domain.stadium.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yare.yare.domain.team.entity.Team;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stadium {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stadium_id", columnDefinition = "SMALLINT")
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @NotNull
    @Column(length = 50)
    private String name;

    @NotNull
    private Double lat;

    @NotNull
    private Double lon;

    @NotNull
    @Column(length = 15)
    private String region;
}
