package yare.yare.domain.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.game.dto.GameDto;
import yare.yare.domain.game.dto.GameListRes;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.repository.GameRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Override
    public GameListRes findGames() {

        List<Game> nextGames = gameRepository.findNextGames();

        List<GameDto> games = nextGames.stream().map(GameDto::toDto).toList();

        GameListRes gameListRes = new GameListRes();
        gameListRes.setGames(games);

        return gameListRes;
    }
}
