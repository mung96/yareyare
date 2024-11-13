package yare.yare.domain.game.feign_client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import yare.yare.domain.game.dto.PriceRes;

@FeignClient(name = "gameFeignClientCustom", url = "https://yareyare.co.kr/api/games")
public interface GameFeignClientCustom {
    @GetMapping("/{gameId}/seats/{seatId}/price")
    PriceRes getSeatPrice(@PathVariable("gameId") Long gameId,
                          @PathVariable("seatId") Long seatId);
}
