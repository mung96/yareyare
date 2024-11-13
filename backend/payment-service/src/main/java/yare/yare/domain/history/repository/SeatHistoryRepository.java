package yare.yare.domain.history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yare.yare.domain.history.entity.SeatHistory;

public interface SeatHistoryRepository extends JpaRepository<SeatHistory, Long> {
}
