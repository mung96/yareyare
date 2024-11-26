package yare.yare.domain.team.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.team.entity.Team;

@Data
@Builder
public class TeamDto {

    private Integer teamId;

    private String teamName;

    private String teamLogo;

    public static TeamDto toDto(Team team) {

        return TeamDto.builder()
                .teamId(team.getId())
                .teamName(team.getName())
                .teamLogo(team.getLogo())
                .build();
    }
}