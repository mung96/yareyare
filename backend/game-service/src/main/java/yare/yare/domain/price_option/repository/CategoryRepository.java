package yare.yare.domain.price_option.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yare.yare.domain.price_option.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
