package yare.yare.domain.payment.service;

import org.springframework.data.domain.Pageable;
import yare.yare.domain.payment.dto.request.CheckValidSeatsReq;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.*;

public interface PurchaseService {
    ReservationListRes reservationList(String memberUuid, Long lastPurchaseId, Pageable pageable);
    CancelReservationListRes cancelReservationList(String memberUuid, Long lastPurchaseId, Pageable pageable);
    void addPurchase(PurchaseAddReq purchaseAddReq, String memberUuid);
    CheckValidSeatsRes checkValidSeats(CheckValidSeatsReq checkValidSeatsReq);
    PurchaseDetailsRes purchaseDetails(String memberUuid, Long purchaseId);
    void cancelPurchased(String memberUuid, Long purchaseId);
    GetTicketRes getTickets(String memberUuid, Long purchaseId);
    GetMySeatsRes getMySeats(String memberUuid, Long purchaseId);
}
