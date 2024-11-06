package yare.yare.domain.team.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.team.dto.TeamDto;
import yare.yare.domain.team.dto.TeamListRes;
import yare.yare.domain.team.repository.TeamRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    @Override
    public TeamListRes findAllTeams() {

        List<TeamDto> teams = teamRepository.findAllBy()
                .stream().map(TeamDto::toDto).toList();

        TeamListRes teamListRes = new TeamListRes();
        teamListRes.setTeams(teams);

        return teamListRes;
    }
}
