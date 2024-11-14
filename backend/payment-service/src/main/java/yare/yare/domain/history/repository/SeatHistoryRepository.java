package yare.yare.domain.history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.history.entity.SeatHistory;

import java.util.List;

@Repository
public interface SeatHistoryRepository extends JpaRepository<SeatHistory, Long> {
    @Query("SELECT sh " +
            "FROM SeatHistory sh " +
            "WHERE sh.purchaseHistory.id = :purchaseHistoryId")
    List<SeatHistory> findByPurchaseHistory(@Param("purchaseHistoryId") Long purchaseHistoryId);
}
