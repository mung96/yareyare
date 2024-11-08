package yare.yare.domain.payment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = " UPDATE Game SET is_deleted = true WHERE game_id = ? ")
@SQLRestriction("is_deleted = false")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @NotNull
    @Column(length = 50)
    private String seasonName;

    @NotNull
    @Column(length = 50)
    private String awayTeamName;

    @NotNull
    @Column(length = 50)
    private String homeTeamName;

    @NotNull
    @Column(length = 50)
    private String stadiumName;

    @NotNull
    private LocalDateTime gameDatetime;
}
