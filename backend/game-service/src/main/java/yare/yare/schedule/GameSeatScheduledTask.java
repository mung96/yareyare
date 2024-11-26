package yare.yare.schedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.repository.GameRepository;
import yare.yare.domain.game.service.GameSeatService;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GameSeatScheduledTask {

    private final GameRepository gameRepository;
    private final GameSeatService gameSeatService;

    @Scheduled(cron = "0 0 2 * * *")
    public void gameSeatSetupTask() { // 8일 전으로 할게요?
        LocalDate today = LocalDate.now().plusDays(8);
        List<Game> games = gameRepository.findAllGamesAfter8Days(today);
        games.forEach(gameSeatService::setupGameSeat);
    }

}
