package yare.yare.domain.team.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamDto {

    private Integer teamId;

    private String teamName;

    private String teamLogo;

    private String region;

    private String stadiumName;
}