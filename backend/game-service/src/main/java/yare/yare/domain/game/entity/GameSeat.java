package yare.yare.domain.game.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yare.yare.domain.price_option.entity.Price;
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
    @JoinColumn(name = "game_id", columnDefinition = "INT UNSIGNED", nullable = false)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("seatId")
    @JoinColumn(name = "seat_id", columnDefinition = "INT UNSIGNED", nullable = false)
    private Seat seat;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "price_id", columnDefinition = "SMALLINT", nullable = false)
    private Price price;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SeatStatus seatStatus;

    public String getSectionName() {
        return seat.getSection().getName();
    }

    public String getRowName() {
        return seat.getRowName();
    }

    public Long getSeatId() {
        return seat.getId();
    }

    public Integer getSeatNumber() {
        return seat.getSeatNumber();
    }

    public Integer getPrice() {
        return price.getPrice();
    }

    public Long getGameId() {
        return game.getId();
    }

    public Integer getPriceId() {
        return price.getId();
    }

    public Integer getGradeId(){
        return price.getGrade().getId();
    }

    public String getGradeName() {
        return price.getGrade().getName();
    }

    public Boolean isAvailable() {
        return seatStatus == SeatStatus.AVAILABLE;
    }

    public Boolean setAvailable() {
        seatStatus = SeatStatus.AVAILABLE;
        return true;
    }
    public Boolean setSoldOut(){
        if(seatStatus == SeatStatus.SOLD_OUT){
            return Boolean.FALSE;
        }
        this.seatStatus = SeatStatus.SOLD_OUT;
        return Boolean.TRUE;
    }
}
