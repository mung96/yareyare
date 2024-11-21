package yare.yare.domain.price_option.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yare.yare.domain.price_option.entity.Price;

import java.util.Optional;

@Repository
public interface PriceRepository extends JpaRepository<Price, Integer> {
    Optional<Price> findByGradeIdAndSeasonIdAndCategoryId(Integer gradeId, Integer seasonId, Integer categoryId);
}
