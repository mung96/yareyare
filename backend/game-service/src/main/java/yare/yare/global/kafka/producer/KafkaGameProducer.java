package yare.yare.global.kafka.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import yare.yare.domain.game.entity.Game;
import yare.yare.global.kafka.dto.GamePayload;
import yare.yare.global.kafka.dto.KafkaGameDto;
import yare.yare.global.kafka.dto.base.Field;
import yare.yare.global.kafka.dto.base.Schema;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaGameProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    private final List<Field> fields = Arrays.asList(
            new Field("long", false, "game_id"),
            new Field("string", false, "season_name"),
            new Field("string", false, "away_team_name"),
            new Field("string", false, "home_team_name"),
            new Field("string", false, "stadium_name"),
            new Field("date", false, "game_date"),
            new Field("time", false, "start_time")
    );

    private final Schema schema = Schema.builder()
            .type("struct")
            .fields(fields)
            .optional(false)
            .name("game")
            .build();

    public Game sendGame(final Game game) {

        GamePayload payload = GamePayload.builder()
                .gameId(game.getId())
                .seasonName(game.getSeasonName())
                .awayTeamName(game.getAwayTeamName())
                .homeTeamName(game.getHomeTeamName())
                .stadiumName(game.getStadiumName())
                .gameDate(game.getGameDate())
                .startTime(game.getStartTime())
                .build();

        KafkaGameDto kafkaGameDto = new KafkaGameDto(schema, payload);

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        try {
            String jsonInString = mapper.writeValueAsString(kafkaGameDto);
            kafkaTemplate.send("game", jsonInString);
            return game;
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            return null;
        }
    }
}
