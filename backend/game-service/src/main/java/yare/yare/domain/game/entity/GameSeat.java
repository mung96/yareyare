package yare.yare.domain.game.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yare.yare.domain.stadium.entity.Seat;
import yare.yare.domain.stadium.enums.SeatStatus;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameSeat {

    @EmbeddedId
    private GameSeatPK gameSeatPK;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("gameId")
    @JoinColumn(columnDefinition = "INT UNSIGNED", nullable = false)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("seatId")
    @JoinColumn(columnDefinition = "INT UNSIGNED", nullable = false)
    private Seat seat;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SeatStatus seatStatus;
}
