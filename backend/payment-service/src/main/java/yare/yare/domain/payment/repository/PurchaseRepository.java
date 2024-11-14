package yare.yare.domain.payment.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yare.yare.domain.payment.dto.TicketDto;
import yare.yare.domain.payment.entity.Purchase;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    @Query("SELECT new yare.yare.domain.payment.dto.TicketDto(" +
            "p.id, g.seasonName, g.awayTeamName, g.homeTeamName, p.reservationId," +
            "p.createdAt, g.stadiumName, g.gameDatetime, p.canceled) " +
            "FROM Purchase p " +
            "LEFT JOIN Game g ON p.game.id = g.id " +
            "WHERE p.id < :lastPurchaseId " +
            "AND p.memberUuid = :memberUuid " +
            "AND p.canceled = false " +
            "ORDER BY p.id DESC")
    Slice<TicketDto> findReservationList(@Param("memberUuid") String memberUuid,
                                        @Param("lastPurchaseId") Long lastPurchaseId,
                                        Pageable pageable);

    @Query("SELECT new yare.yare.domain.payment.dto.TicketDto(" +
            "p.id, g.seasonName, g.awayTeamName, g.homeTeamName, p.reservationId," +
            "p.createdAt, g.stadiumName, g.gameDatetime, p.canceled) " +
            "FROM Purchase p " +
            "LEFT JOIN Game g ON p.game.id = g.id " +
            "WHERE p.memberUuid = :memberUuid " +
            "AND p.canceled = false " +
            "ORDER BY p.id DESC")
    Slice<TicketDto> findDefaultReservationList(@Param("memberUuid") String memberUuid,
                                               Pageable pageable);

    @Query("SELECT new yare.yare.domain.payment.dto.TicketDto(" +
            "p.id, g.seasonName, g.awayTeamName, g.homeTeamName, p.reservationId," +
            "p.createdAt, g.stadiumName, g.gameDatetime, p.canceled) " +
            "FROM Purchase p " +
            "LEFT JOIN Game g ON p.game.id = g.id " +
            "WHERE p.id < :lastPurchaseId " +
            "AND p.memberUuid = :memberUuid " +
            "AND p.canceled = true " +
            "ORDER BY p.id DESC")
    Slice<TicketDto> findCancelReservationList(@Param("memberUuid") String memberUuid,
                                        @Param("lastPurchaseId") Long lastPurchaseId,
                                        Pageable pageable);

    @Query("SELECT new yare.yare.domain.payment.dto.TicketDto(" +
            "p.id, g.seasonName, g.awayTeamName, g.homeTeamName, p.reservationId," +
            "p.createdAt, g.stadiumName, g.gameDatetime, p.canceled) " +
            "FROM Purchase p " +
            "LEFT JOIN Game g ON p.game.id = g.id " +
            "WHERE p.memberUuid = :memberUuid " +
            "AND p.canceled = true " +
            "ORDER BY p.id DESC")
    Slice<TicketDto> findDefaultCancelReservationList(@Param("memberUuid") String memberUuid,
                                                      Pageable pageable);


}
