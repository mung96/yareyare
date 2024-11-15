package yare.yare.domain.payment.service;

import org.springframework.data.domain.Pageable;
import yare.yare.domain.payment.dto.request.CheckValidSeatsReq;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.CheckValidSeatsRes;
import yare.yare.domain.payment.dto.response.PurchaseDetailsRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;

public interface PurchaseService {
    ReservationListRes reservationList(String memberUuid, Long lastPurchaseId, Pageable pageable);
    CancelReservationListRes cancelReservationList(String memberUuid, Long lastPurchaseId, Pageable pageable);
    void addPurchase(PurchaseAddReq purchaseAddReq, String memberUuid);
    CheckValidSeatsRes checkValidSeats(CheckValidSeatsReq checkValidSeatsReq);
    PurchaseDetailsRes purchaseDetails(String memberUuid, Long purchaseId);
}
