package yare.yare.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.game.entity.Game;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    @Query("select g " +
            "from Game g " +
            "join fetch g.homeTeam ht " +
            "join fetch g.awayTeam at " +
            "join fetch ht.stadium s " +
            "where g.gameDate > CURRENT_DATE " +
            "and g.gameDate <= :lastDate " +
            "and (ht.id = :teamId or at.id = :teamId)")
    List<Game> findNextGamesByTeam(@Param("teamId") Integer teamId, @Param("lastDate") LocalDate lastDate);

    @Query("select g " +
            "from Game g " +
            "join fetch g.homeTeam ht " +
            "join fetch g.awayTeam at " +
            "join fetch ht.stadium s " +
            "where g.id = :gameId")
    Optional<Game> findGameByGameId(@Param("gameId") Integer gameId);
}
