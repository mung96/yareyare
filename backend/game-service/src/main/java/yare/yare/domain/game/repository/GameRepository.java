package yare.yare.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.game.dto.GradeDto;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.entity.GameSeat;
import yare.yare.domain.stadium.enums.SeatStatus;

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
    Optional<Game> findGameByGameId(@Param("gameId") Long gameId);

    @Query("select new yare.yare.domain.game.dto.GradeDto( " +
            "gr.id, gr.name, count(gs)) " +
            "from GameSeat gs " +
            "join gs.seat s " +
            "join s.section sec " +
            "join sec.grade gr " +
            "where gs.game.id = :gameId " +
            "and gs.seatStatus = 'AVAILABLE' " +
            "group by gr.id " +
            "order by gr.id")
    List<GradeDto> findAvailableSeatListByGameId(@Param("gameId") Long gameId);

    @Query("select gs " +
            "from GameSeat gs " +
            "join fetch gs.seat s " +
            "join fetch s.section sec " +
            "where gs.game.id = :gameId " +
            "and sec.grade.id = :gradeId ")
    List<GameSeat> findGameSeatsByGradeId(@Param("gameId") Long gameId, @Param("gradeId") Integer gradeId);

    @Query("select g " +
            "from Game g " +
            "where g.gameDate = " +
            "(select max(g.gameDate) " +
            "from Game g " +
            "where g.gameDate < CURRENT_DATE)")
    List<Game> findLastGames();

    @Modifying
    @Query("update GameSeat gs " +
            "set gs.seatStatus = :status " +
            "where gs.game.id = :gameId " +
            "and gs.seat.id in :seats")
    void updateSeatStatus(@Param("status") SeatStatus status, @Param("gameId") Long gameId, @Param("seats") List<Long> seats);

    @Query("select gs " +
            "from GameSeat gs " +
            "join fetch gs.price p " +
            "where gs.game.id = :gameId " +
            "and gs.seat.id in :seats")
    List<GameSeat> findSelectedSeats(@Param("gameId") Long gameId, @Param("seats") List<Long> seats);

    @Query("select g " +
            "from Game g " +
            "join fetch g.homeTeam ht " +
            "join fetch g.awayTeam at " +
            "join fetch g.homeTeam.stadium st " +
            "where (ht.id = :teamId or at.id = :teamId) " +
            "and g.gameDate >= :findOptionStartDate " +
            "and g.gameDate < :findOptionEndDate")
    List<Game> findScheduleListWithYearAndMonth(Integer teamId, LocalDate findOptionStartDate, LocalDate findOptionEndDate);

    @Query("select gs.price.price " +
            "from GameSeat gs " +
            "where gs.game.id = :gameId " +
            "and gs.seat.id = :seatId")
    Optional<Integer> getPrice(@Param("gameId") Long gameId, @Param("seatId") Long seatId);
}
