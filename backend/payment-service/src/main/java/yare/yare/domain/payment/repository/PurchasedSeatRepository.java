package yare.yare.domain.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.payment.entity.PurchasedSeat;

import java.util.List;

@Repository
public interface PurchasedSeatRepository extends JpaRepository<PurchasedSeat, Long> {
    @Query("SELECT ps FROM PurchasedSeat ps WHERE ps.purchase.id = :purchaseId" )
    List<PurchasedSeat> findPurchasedSeatByPurchaseId(@Param("purchaseId") Long purchaseId);
}
