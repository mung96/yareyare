package yare.yare.domain.team.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yare.yare.domain.team.entity.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    @EntityGraph(attributePaths = {"stadium"})
    List<Team> findAllBy();

    @Query("select t " +
            "from Team t " +
            "where t.name = :name")
    Optional<Team> findTeamByName(String name);

    Optional<Team> findByName(String name);
}
