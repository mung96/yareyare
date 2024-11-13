package yare.yare.domain.history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yare.yare.domain.history.entity.PurchaseHistory;

public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
}
