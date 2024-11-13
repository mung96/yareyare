package yare.yare.domain.history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yare.yare.domain.history.entity.SeatHistory;

@Repository
public interface SeatHistoryRepository extends JpaRepository<SeatHistory, Long> {
}
