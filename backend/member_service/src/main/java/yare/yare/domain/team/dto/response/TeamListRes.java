package yare.yare.domain.team.dto.response;

import lombok.Data;
import yare.yare.domain.team.dto.TeamDto;

import java.util.List;

@Data
public class TeamListRes {
    private List<TeamDto> teams;
}
