package yare.yare.global.feign.service;

import yare.yare.domain.game.dto.GameSeatStatusUpdateDto;
import yare.yare.global.feign.dto.PaymentValidationRes;

public interface FeignService {
    PaymentValidationRes validatePaymentInfo(Long gameId, GameSeatStatusUpdateDto gameSeatStatusUpdateDto);
}
