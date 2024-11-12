package yare.yare.domain.stadium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.stadium.entity.Seat;
import yare.yare.domain.stadium.entity.Stadium;

import java.util.List;

@Repository
public interface StadiumRepository extends JpaRepository<Stadium, Integer> {

    @Query("select s " +
            "from Seat s " +
            "join fetch s.section sec " +
            "where sec.grade.id = :gradeId")
    public List<Seat> findSeatsWithSectionByGradeId(@Param("gradeId") Integer gradeId);

    @Query("select s " +
            "from Seat s " +
            "join s.section sec " +
            "where sec.grade.id = :gradeId")
    public List<Seat> findSeatsByGradeId(@Param("gradeId") Integer gradeId);



    @Query("select s " +
            "from Seat s ")
    public List<Seat> findSeatsByStadiumId(@Param("stadiumId")Integer stadiumId);

}
