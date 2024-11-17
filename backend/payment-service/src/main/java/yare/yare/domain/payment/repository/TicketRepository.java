package yare.yare.domain.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.payment.dto.TicketDetailDto;
import yare.yare.domain.payment.entity.Ticket;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT new yare.yare.domain.payment.dto.TicketDetailDto(ps.ticketUuid, t.imgSrc) " +
            "FROM PurchasedSeat ps JOIN Ticket t ON ps.id  = t.purchasedSeat.id " +
            "WHERE ps.purchase.id = :purchaseId")
    List<TicketDetailDto> getTicketDetailByPurchaseId(@Param("purchaseId") Long purchaseId);
}
