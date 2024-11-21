package yare.yare.global.feign.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yare.yare.domain.game.dto.GameSeatStatusUpdateDto;
import yare.yare.global.feign.client.PaymentClient;
import yare.yare.global.feign.dto.PaymentValidationRes;

@Service
@RequiredArgsConstructor
public class FeignServiceImpl implements FeignService {

    private final PaymentClient paymentClient;

    public PaymentValidationRes validatePaymentInfo(Long gameId, GameSeatStatusUpdateDto gameSeatStatusUpdateDto) {
        return paymentClient.validatePayment(gameSeatStatusUpdateDto.getIdempotencyKey(),
                gameId, gameSeatStatusUpdateDto.getSeatIds());
    }

}
