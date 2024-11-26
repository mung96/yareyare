package yare.yare.domain.team.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.team.dto.TeamListRes;
import yare.yare.domain.team.service.TeamService;
import yare.yare.global.dto.ResponseDto;

import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/teams")
    public ResponseDto<TeamListRes> teamList() {

        TeamListRes result = teamService.findAllTeams();

        return ResponseDto.success(OK, result);
    }
}
