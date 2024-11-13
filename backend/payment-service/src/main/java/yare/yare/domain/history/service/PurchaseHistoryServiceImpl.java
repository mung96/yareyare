package yare.yare.domain.history.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.game.dto.PriceRes;
import yare.yare.domain.game.service.GameService;
import yare.yare.domain.history.dto.SeatDto;
import yare.yare.domain.history.dto.request.PurchaseHistoryAddReq;
import yare.yare.domain.history.dto.response.PurchaseHistoryAddRes;
import yare.yare.domain.history.entity.PurchaseHistory;
import yare.yare.domain.history.entity.SeatHistory;
import yare.yare.domain.history.repository.PurchaseHistoryRepository;
import yare.yare.domain.history.repository.SeatHistoryRepository;
import yare.yare.global.exception.CustomException;
import yare.yare.global.utils.RedisUtils;

import java.util.Random;
import java.util.UUID;

import static yare.yare.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PurchaseHistoryServiceImpl implements PurchaseHistoryService {
    private static final int CHARGE = 1000;
    private final PurchaseHistoryRepository purchaseHistoryRepository;
    private final SeatHistoryRepository seatHistoryRepository;
    private final GameService gameService;
    private final RedisUtils redisUtils;

    @Override
    @Transactional
    public PurchaseHistoryAddRes addPurchaseHistory(PurchaseHistoryAddReq purchaseHistoryAddReq, String memberUuid) {
        //1. 유효하지 않은 멱등키면 에러
        String idempotencyKey = String.format("wating:%s:%s",purchaseHistoryAddReq.getGameId(), purchaseHistoryAddReq.getIdempotencyKey());

        if(redisUtils.getData(idempotencyKey) == null) {
            throw new CustomException(INVALID_IDEMPOTENCY_KEY);
        }

        //2. 분산락 획득
        String lockKey = String.format("history:%s", purchaseHistoryAddReq.getIdempotencyKey());

        if (!redisUtils.lock(lockKey, 3000L)) {
            throw new CustomException(CONFLICT_WITH_HISTORY);
        }

        //3. 예매할 자리가 내가 예매한 자리인지 체크
        PurchaseHistory purchaseHistory = purchaseHistoryAddReq.toEntity(memberUuid);
        Integer price = gameService.getSeatPrice(purchaseHistoryAddReq.getGameId(),
                purchaseHistoryAddReq.getSeats().getFirst().getSeatId()).getBody().getPrice();

        purchaseHistoryAddReq.getSeats().forEach(seat -> {
            String key = String.format("lock:seat%s:%s", purchaseHistoryAddReq.getGameId(), seat.getSeatId());

            if(redisUtils.getData(key).equals(purchaseHistoryAddReq.getIdempotencyKey())) {
                throw new CustomException(INVALID_SEAT);
            }

            SeatHistory seatHistory = SeatDto.toEntity(seat.getSeatId(), price, purchaseHistory);

            seatHistoryRepository.save(seatHistory);
        });

        //total 가격 계산(개수 체크해서 가격이랑 개수 곱하기 + 수수료)
        int size = purchaseHistoryAddReq.getSeats().size();
        Integer totalPrice =  (size * price) + (size * CHARGE);
        purchaseHistory.updateTotalPrice(totalPrice);

        purchaseHistoryRepository.save(purchaseHistory);

        redisUtils.unlock(lockKey);

        return PurchaseHistoryAddRes.toDto(purchaseHistory);
    }
}
