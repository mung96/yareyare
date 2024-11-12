package yare.yare.domain.game.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import yare.yare.domain.game.entity.GameSeat;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class GameSeatCustomJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    private final Integer BATCH_SIZE = 100;

    public void saveAll(List<GameSeat> gameSeats) {

        Integer batchCount = 0;
        List<GameSeat> subList = new ArrayList<GameSeat>();
        for (int i = 0; i < gameSeats.size(); i++) {
            subList.add(gameSeats.get(i));

            if ((i + 1) % BATCH_SIZE == 0) {
                log.info(String.valueOf(subList.size()));
                batchCount = batchInsert(batchCount, subList);
                subList.clear();
            }
        }
        if (!subList.isEmpty()) {
            batchCount = batchInsert(batchCount, subList);
            subList.clear();
        }

    }

    private Integer batchInsert(int batchCount, List<GameSeat> gameSeats) {
        jdbcTemplate.batchUpdate("INSERT INTO `yare-games`.game_seat (`game_id`,`price_id`,`seat_id`,`seat_status`) VALUES (?, ?, ?, ?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, gameSeats.get(i).getGameId());
                        ps.setInt(2, gameSeats.get(i).getPriceId());
                        ps.setLong(3, gameSeats.get(i).getSeatId());
                        ps.setString(4, gameSeats.get(i).getSeatStatus().toString());
                    }

                    @Override
                    public int getBatchSize() {
                        return gameSeats.size();
                    }
                });
        return batchCount + 1;
    }
}
