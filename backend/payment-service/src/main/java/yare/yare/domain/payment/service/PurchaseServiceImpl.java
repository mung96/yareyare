package yare.yare.domain.payment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.payment.dto.TicketDto;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;
import yare.yare.domain.payment.repository.PurchaseRepository;
import yare.yare.global.dto.SliceDto;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {
    private final PurchaseRepository purchaseRepository;

    @Override
    public ReservationListRes reservationList(Long memberId, Long lastPurchaseId, Pageable pageable) {
        Slice<TicketDto> tickets;

        if (lastPurchaseId == null) {
            tickets =  purchaseRepository.findDefaultReservationList(memberId, pageable);
        } else {
            tickets =  purchaseRepository.findReservationList(memberId, lastPurchaseId, pageable);
        }

        return ReservationListRes.toDto(new SliceDto<>(tickets));
    }

    @Override
    public CancelReservationListRes cancelReservationList(Long memberId, Long lastPurchaseId, Pageable pageable) {
        Slice<TicketDto> tickets;

        if(lastPurchaseId == null) {
            tickets = purchaseRepository.findDefaultCancelReservationList(memberId, pageable);
        } else {
            tickets = purchaseRepository.findCancelReservationList(memberId, lastPurchaseId, pageable);
        }

        return CancelReservationListRes.toDto(new SliceDto<>(tickets));
    }
}
