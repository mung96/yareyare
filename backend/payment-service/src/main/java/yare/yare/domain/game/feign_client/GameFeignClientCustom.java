package yare.yare.domain.game.feign_client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import yare.yare.domain.game.dto.SeatInfoRes;

import java.util.List;

@FeignClient(name = "game-service")
public interface GameFeignClientCustom {
    @GetMapping("/{gameId}/seats/details")
    SeatInfoRes getSeatPrice(@PathVariable("gameId") Long gameId,
                             @RequestParam List<Long> seatIds);
}
