package yare.yare.domain.price_option.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yare.yare.domain.price_option.entity.Season;

import java.util.Optional;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Integer> {

    Optional<Season> findByYear(Integer year);
}
