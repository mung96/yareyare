package yare.yare.domain.team.dto;

import lombok.Data;

import java.util.List;

@Data
public class TeamListRes {

    private List<TeamDto> teams;
}