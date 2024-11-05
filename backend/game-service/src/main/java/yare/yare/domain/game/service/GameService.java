package yare.yare.domain.game.service;

import yare.yare.domain.game.dto.GameDetailsRes;
import yare.yare.domain.game.dto.GameListRes;


public interface GameService {

    GameListRes findGames();

    GameListRes findGamesByTeam(Integer teamId);

    GameDetailsRes findGame(Integer gameId);
}
