package yare.yare;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.repository.GameRepository;
import yare.yare.domain.game.service.GameSeatService;
import yare.yare.global.exception.CustomException;
import yare.yare.global.statuscode.ErrorCode;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final GameSeatService gameSeatService;
    private final GameRepository gameRepository;

    @PostMapping("/{gameId}")
    public String test(@PathVariable("gameId") Long gameId) {

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
        gameSeatService.setupGameSeat(game);

        return "success";
    }
}
