package yare.yare.domain.stadium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.stadium.entity.Grade;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer> {

    @Query("select gr " +
            "from Grade gr " +
            "where gr.stadium.id = (select  g.homeTeam.stadium.id " +
            "from Game g " +
            "where g.id = :gameId )"
    )
    public List<Grade> findAllByGameId(@Param("gameId") Long gameId);


}
