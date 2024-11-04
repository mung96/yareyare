package yare.yare.domain.team.dto;

import lombok.Data;

@Data
public class TeamDto {

    private Integer teamId;

    private String teamName;

    private String teamLogo;

    private String region;

    private String stadiumName;
}