package yare.yare.domain.game.feign_client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import yare.yare.domain.game.dto.CheckSeatReq;
import yare.yare.domain.game.dto.CheckSeatRes;
import yare.yare.domain.game.dto.SeatInfoRes;

import java.util.List;

@FeignClient(name = "game-service")
public interface GameFeignClientCustom {
    @GetMapping("/api/games/{gameId}/seats/details")
    SeatInfoRes getSeatPrice(@PathVariable("gameId") Long gameId,
                             @RequestParam List<Long> seatIds);

    @PatchMapping("/api/games/{gameId}/seats/sold-out")
    CheckSeatRes checkValidSeats(@PathVariable("gameId") Long gameId,
                                 @RequestBody CheckSeatReq checkSeatReq);
}
