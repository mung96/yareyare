package yare.yare.domain.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.game.dto.GameDetailsRes;
import yare.yare.domain.game.dto.GameDto;
import yare.yare.domain.game.dto.GameListRes;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.repository.GameRepository;
import yare.yare.global.exception.CustomException;

import java.time.LocalDate;
import java.util.List;

import static yare.yare.global.statuscode.ErrorCode.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
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

    @Override
    public GameListRes findGamesByTeam(Integer teamId) {

        List<Game> nextGames = gameRepository.findNextGamesByTeam(teamId, LocalDate.now().plusDays(10));

        List<GameDto> games = nextGames.stream().map(GameDto::toDto).toList();

        GameListRes gameListRes = new GameListRes();
        gameListRes.setGames(games);

        return gameListRes;
    }

    @Override
    public GameDetailsRes findGame(Long gameId) {

        Game game = gameRepository.findGameByGameId(gameId)
                .orElseThrow(() -> new CustomException(NOT_FOUND));

        return GameDetailsRes.toDto(game);
    }
}
