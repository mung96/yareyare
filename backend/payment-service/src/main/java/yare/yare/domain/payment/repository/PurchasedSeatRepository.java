package yare.yare.domain.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yare.yare.domain.payment.entity.PurchasedSeat;

@Repository
public interface PurchasedSeatRepository extends JpaRepository<PurchasedSeat, Long> {
}
