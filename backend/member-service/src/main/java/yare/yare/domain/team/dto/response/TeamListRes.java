package yare.yare.domain.team.dto.response;

import lombok.Data;
import lombok.Getter;
import yare.yare.domain.team.dto.TeamDto;

import java.util.List;

@Data
public class TeamListRes {
    private Header header;

    private Body body;

    public static class Header {
        private String message;
    }

    @Getter
    public static class Body {
        private List<TeamDto> teams;
    }
}
