package yare.yare.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yare.yare.domain.game.entity.GameSeat;
import yare.yare.domain.game.entity.GameSeatPK;

@Repository
public interface GameSeatRepository extends JpaRepository<GameSeat, GameSeatPK> {

    boolean existsByGameSeatPK_GameId(long gameId);
}
