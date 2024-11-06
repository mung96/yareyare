package yare.yare.domain.team.dto;

import lombok.Builder;
import lombok.Data;
import yare.yare.domain.stadium.entity.Stadium;
import yare.yare.domain.team.entity.Team;

@Data
@Builder
public class TeamDto {

    private Integer teamId;

    private String teamName;

    private String teamLogo;

    private String region;

    private String stadiumName;

    public static TeamDto toDto(Team team) {

        Stadium stadium = team.getStadium();

        return TeamDto.builder()
                .teamId(team.getId())
                .teamName(team.getName())
                .teamLogo(team.getLogo())
                .region(stadium.getRegion())
                .stadiumName(stadium.getName())
                .build();
    }
}