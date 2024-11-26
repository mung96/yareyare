package yare.yare.domain.history.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yare.yare.domain.history.entity.PurchaseHistory;

import java.util.Optional;

@Repository
public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
    @Query("SELECT ph FROM PurchaseHistory ph WHERE TRIM(ph.idempotencyKey) = :idempotencyKey")
    Optional<PurchaseHistory> findByIdempotencyKey(@Param("idempotencyKey") String idempotencyKey);
}
