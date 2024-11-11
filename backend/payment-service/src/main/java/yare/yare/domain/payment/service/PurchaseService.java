package yare.yare.domain.payment.service;

import org.springframework.data.domain.Pageable;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;

public interface PurchaseService {
    ReservationListRes reservationList(Long memberId, Long lastPurchaseId, Pageable pageable);
    CancelReservationListRes cancelReservationList(Long memberId, Long lastPurchaseId, Pageable pageable);
}
