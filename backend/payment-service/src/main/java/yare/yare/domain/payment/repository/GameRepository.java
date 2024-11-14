package yare.yare.domain.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yare.yare.domain.payment.entity.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
}
