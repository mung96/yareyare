package yare.yare.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.game.entity.Game;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    @Query("select g " +
            "from Game g " +
            "join fetch g.homeTeam ht " +
            "join fetch g.awayTeam at " +
            "join fetch ht.stadium s " +
            "where g.gameDate = " +
            "(select min(g.gameDate) " +
            "from Game g " +
            "where g.gameDate > CURRENT_DATE)")
    List<Game> findNextGames();
}
