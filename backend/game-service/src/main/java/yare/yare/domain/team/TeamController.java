package yare.yare.domain.team;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.team.dto.TeamDto;
import yare.yare.domain.team.dto.TeamListRes;
import yare.yare.global.dto.ResponseDto;

import java.util.ArrayList;
import java.util.List;

import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequestMapping("/games")
public class TeamController {

    @GetMapping("/teams")
    public ResponseDto<TeamListRes> teamList() {

        List<TeamDto> teams = new ArrayList<>();

        teams.add(TeamDto.builder()
                .teamId(1)
                .teamName("삼성 라이온즈")
                .teamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/samsung.svg")
                .region("대구")
                .stadiumName("대구삼성라이온즈파크")
                .build());

        teams.add(TeamDto.builder()
                .teamId(2)
                .teamName("두산 베어스")
                .teamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/doosan.svg")
                .region("잠실")
                .stadiumName("잠실야구장")
                .build());

        teams.add(TeamDto.builder()
                .teamId(4)
                .teamName("키움 히어로즈")
                .teamLogo("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/kiwoom.svg")
                .region("고척")
                .stadiumName("고척스카이돔")
                .build());

        TeamListRes result = new TeamListRes();
        result.setTeams(teams);

        return ResponseDto.success(OK, result);
    }
}
