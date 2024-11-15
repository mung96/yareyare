package yare.yare.domain.payment.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.game.dto.CheckSeatReq;
import yare.yare.domain.game.service.GameService;
import yare.yare.domain.history.entity.PurchaseHistory;
import yare.yare.domain.history.entity.SeatHistory;
import yare.yare.domain.history.repository.PurchaseHistoryRepository;
import yare.yare.domain.history.repository.SeatHistoryRepository;
import yare.yare.domain.payment.dto.TicketDto;
import yare.yare.domain.payment.dto.request.CheckValidSeatsReq;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.CheckValidSeatsRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;
import yare.yare.domain.payment.entity.Purchase;
import yare.yare.domain.payment.entity.PurchasedSeat;
import yare.yare.domain.payment.repository.PurchaseRepository;
import yare.yare.domain.payment.repository.PurchasedSeatRepository;
import yare.yare.domain.portone.service.PortOneService;
import yare.yare.global.dto.SliceDto;
import yare.yare.global.exception.CustomException;
import yare.yare.global.utils.RedisUtils;

import java.util.*;

import static yare.yare.global.statuscode.ErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PurchaseServiceImpl implements PurchaseService {
    private static final String PREFIX_TICKET_UNIQUE = "T327";
    private final GameService gameService;
    private final PortOneService portOneService;
    private final PurchaseRepository purchaseRepository;
    private final PurchaseHistoryRepository purchaseHistoryRepository;
    private final PurchasedSeatRepository purchasedSeatRepository;
    private final SeatHistoryRepository seatHistoryRepository;
    private final RedisUtils redisUtils;

    @Override
    public ReservationListRes reservationList(String memberUuid, Long lastPurchaseId, Pageable pageable) {
        Slice<TicketDto> tickets;

        if (lastPurchaseId == null) {
            tickets =  purchaseRepository.findDefaultReservationList(memberUuid, pageable);
        } else {
            tickets =  purchaseRepository.findReservationList(memberUuid, lastPurchaseId, pageable);
        }

        return ReservationListRes.toDto(new SliceDto<>(tickets));
    }

    @Override
    public CancelReservationListRes cancelReservationList(String memberUuid, Long lastPurchaseId, Pageable pageable) {
        Slice<TicketDto> tickets;

        if(lastPurchaseId == null) {
            tickets = purchaseRepository.findDefaultCancelReservationList(memberUuid, pageable);
        } else {
            tickets = purchaseRepository.findCancelReservationList(memberUuid, lastPurchaseId, pageable);
        }

        return CancelReservationListRes.toDto(new SliceDto<>(tickets));
    }

    @Override
    @Transactional
    public void addPurchase(PurchaseAddReq purchaseAddReq, String memberUuid) {
        String lockKey = String.format("purchase:%s", purchaseAddReq.getIdempotencyKey());

        if (!redisUtils.lock(lockKey, 3000L)) {
            throw new CustomException(CONFLICT_WITH_PURCHASE);
        }

        PurchaseHistory purchaseHistory = purchaseHistoryRepository.findByIdempotencyKey(purchaseAddReq.getIdempotencyKey())
                .orElseThrow(() -> new CustomException(NOT_FOUND_HISTORY));

        Integer totalPrice = portOneService.getPrice(purchaseAddReq.getIdempotencyKey());

        if(!Objects.equals(purchaseHistory.getTotalPrice(), totalPrice)) {
            throw new CustomException(INVALID_TOTAL_PRICE);
        }

        if(!Objects.equals(purchaseHistory.getMemberUuid(), memberUuid)) {
            throw new CustomException(PURCHASE_NOT_MINE);
        }

        Purchase purchase = purchaseAddReq.toEntity(purchaseHistory, totalPrice);

        purchaseRepository.save(purchase);

        purchaseRepository.flush();

        List<SeatHistory> seatHistoryList = seatHistoryRepository.findByPurchaseHistory(purchaseHistory.getId());

        String lastReservationId = null;
        List<Long> seatIds = new ArrayList<>();

        for (int i = 0; i < seatHistoryList.size(); i++) {
            SeatHistory seatHistory = seatHistoryList.get(i);
            PurchasedSeat purchasedSeat = purchaseAddReq.toEntity(seatHistory, purchase);

            seatIds.add(purchasedSeat.getSeatId());

            purchasedSeatRepository.save(purchasedSeat);

            String ticketUuid = makeTicketUuid(purchase.getGame().getId(),
                    purchasedSeat.getSeatId(), purchasedSeat.getId());

            purchasedSeat.updateTicketUuid(ticketUuid);

            if (i == seatHistoryList.size() - 1) {
                lastReservationId = ticketUuid;
            }
        }

        purchasedSeatRepository.flush();

        purchase.updateReservationId(lastReservationId);

        CheckSeatReq checkSeatReq = CheckSeatReq.toDto(purchase.getIdempotencyKey(), seatIds);

        gameService.checkValidSeats(purchase.getGame().getId(), checkSeatReq);

        redisUtils.unlock(lockKey);
    }

    @Override
    @Transactional
    public CheckValidSeatsRes checkValidSeats(CheckValidSeatsReq checkValidSeatsReq) {
        PurchaseHistory purchaseHistory = purchaseHistoryRepository.findByIdempotencyKey(checkValidSeatsReq.getIdempotencyKey())
                .orElse(null);
        log.info("id {}", checkValidSeatsReq.getIdempotencyKey());
        if(purchaseHistory == null) {
            log.info("purchase가 null이에요!!");
            return CheckValidSeatsRes.isInValid(checkValidSeatsReq.getIdempotencyKey());
        }

        log.info("request Ids {}", Arrays.toString(checkValidSeatsReq.getSeatsId().toArray()));

        List<Long> seatIds = seatHistoryRepository.findIdsByPurchaseId(purchaseHistory.getId());

        log.info("select Ids {}", Arrays.toString(seatIds.toArray()));

        Collections.sort(checkValidSeatsReq.getSeatsId());
        Collections.sort(seatIds);

        if(!checkValidSeatsReq.getSeatsId().equals(seatIds)) {
            log.info("두개가 같지 않아요!!");
            return CheckValidSeatsRes.isInValid(checkValidSeatsReq.getIdempotencyKey());
        }

        return CheckValidSeatsRes.isValid(checkValidSeatsReq.getIdempotencyKey());
    }

    private String makeTicketUuid(Long gameId, Long seatId, Long ticketId) {
        return PREFIX_TICKET_UNIQUE+gameId+seatId+ticketId;
    }
}
