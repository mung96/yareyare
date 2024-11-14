package yare.yare.domain.history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yare.yare.domain.history.entity.PurchaseHistory;

import java.util.Optional;

@Repository
public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
    Optional<PurchaseHistory> findByIdempotencyKey(String idempotencyKey);
}
