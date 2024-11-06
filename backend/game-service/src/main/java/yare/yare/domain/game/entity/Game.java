package yare.yare.domain.game.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import yare.yare.domain.price_option.entity.Category;
import yare.yare.domain.price_option.entity.Season;
import yare.yare.domain.team.entity.Team;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "home_team_id", nullable = false)
    private Team homeTeam;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "away_team_id", nullable = false)
    private Team awayTeam;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @NotNull
    private LocalDate gameDate;

    @NotNull
    private LocalTime startTime;

    @NotNull
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @NotNull
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @NotNull
    @Column(columnDefinition = "TINYINT")
    private Boolean isFinished;

    @Column(columnDefinition = "TINYINT")
    private Integer homeScore;

    @Column(columnDefinition = "TINYINT")
    private Integer awayScore;

    public String getStadiumName() {
        return homeTeam.getStadium().getName();
    }

    public String getHomeTeamName() {
        return homeTeam.getName();
    }

    public String getAwayTeamName() {
        return awayTeam.getName();
    }

    public String getHomeTeamLogo() {
        return homeTeam.getLogo();
    }

    public String getAwayTeamLogo() {
        return awayTeam.getLogo();
    }

    public LocalDateTime getTicketOpenTime() {
        return LocalDateTime.of(gameDate.minusDays(7), homeTeam.getStadium().getTicketOpenTime());
    }

    public String getSeasonName() {
        return season.getName();
    }

    public String getRegion() {
        return homeTeam.getStadium().getRegion();
    }
}
