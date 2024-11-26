package yare.yare.global.kafka.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
public class GamePayload {

    private Long game_id;

    private String season_name;

    private String away_team_name;

    private String home_team_name;

    private String stadium_name;

    private LocalDateTime game_datetime;

}
