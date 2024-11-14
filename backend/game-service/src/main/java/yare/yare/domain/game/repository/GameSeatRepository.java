package yare.yare.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.game.entity.GameSeat;
import yare.yare.domain.game.entity.GameSeatPK;

import java.util.Optional;

@Repository
public interface GameSeatRepository extends JpaRepository<GameSeat, GameSeatPK> {

    boolean existsByGameSeatPK_GameId(long gameId);


    @Query("select gs " +
            "from GameSeat gs " +
            "join fetch gs.price p " +
            "join fetch gs.price.grade gr " +
            "join fetch gs.seat s " +
            "join fetch gs.seat.section sec " +
            "where gs.game.id = :gameId " +
            "and gs.seat.id = :seatId")
    Optional<GameSeat> findByGameIdAndSeatId(@Param("gameId") long gameId, @Param("seatId") long seatId);
}
