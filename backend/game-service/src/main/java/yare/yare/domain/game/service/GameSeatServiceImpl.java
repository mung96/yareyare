package yare.yare.domain.game.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.entity.GameSeat;
import yare.yare.domain.game.entity.GameSeatPK;
import yare.yare.domain.game.repository.GameRepository;
import yare.yare.domain.game.repository.GameSeatCustomJdbcRepository;
import yare.yare.domain.game.repository.GameSeatRepository;
import yare.yare.domain.price_option.entity.Price;
import yare.yare.domain.price_option.repository.PriceRepository;
import yare.yare.domain.stadium.entity.Grade;
import yare.yare.domain.stadium.entity.Seat;
import yare.yare.domain.stadium.repository.GradeRepository;
import yare.yare.domain.stadium.repository.StadiumRepository;
import yare.yare.global.event.UnlockEvent;
import yare.yare.global.exception.CustomException;
import yare.yare.global.kafka.producer.KafkaGameProducer;
import yare.yare.global.utils.RedisUtil;

import java.util.List;

import static yare.yare.domain.stadium.enums.SeatStatus.AVAILABLE;
import static yare.yare.global.statuscode.ErrorCode.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
//@Transactional(readOnly = true)
public class GameSeatServiceImpl implements GameSeatService {

    private final GameRepository gameRepository;
    private final GradeRepository gradeRepository;
    private final PriceRepository priceRepository;
    private final StadiumRepository stadiumRepository;
    private final GameSeatRepository gameSeatRepository;
    private final GameSeatCustomJdbcRepository gameSeatBatchRepository;;
    private final ApplicationEventPublisher eventPub;
    private final RedisUtil redisUtil;
    private final KafkaGameProducer kafkaGameProducer;


    @Override
    @Transactional
    public void setupGameSeat(final Game game) {
        if (!redisUtil.lock("game:" + game.getId(), 3000L)) {
            log.info("lock 획득 실패");
            return;
        }
        if (gameSeatRepository.existsByGameSeatPK_GameId(game.getId())) {
            log.info("이미 존재하는 data");
            return;
        }
        List<Grade> gradeList = gradeRepository.findAllByGameId(game.getId());
        gradeList.forEach(grade -> {

            Price price = priceRepository.findByGradeIdAndSeasonIdAndCategoryId(grade.getId(), game.getSeason().getId(), game.getCategory().getId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND));
            List<Seat> seatList = stadiumRepository.findSeatsByGradeId(grade.getId());

            List<GameSeat> gameSeatList = seatList.stream().map((seat) -> {
                GameSeatPK gameSeatPk = new GameSeatPK(game.getId(), seat.getId());
                return new GameSeat(gameSeatPk, game, seat, price, AVAILABLE);
            }).toList();
            gameSeatBatchRepository.saveAll(gameSeatList);
        });
        kafkaGameProducer.sendGame(game);
        eventPub.publishEvent(new UnlockEvent(this, "game:" + game.getId()));
    }

    @Override
    @Transactional
    public void setupGameSeatByGameId(final Long gameId) {
        Game game = gameRepository.findGameByGameId(gameId)
                .orElseThrow(() -> new CustomException(NOT_FOUND));
        this.setupGameSeat(game);
    }


}
