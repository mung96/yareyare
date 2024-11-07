package yare.yare.domain.team.feign_client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import yare.yare.domain.team.dto.response.TeamListRes;

@FeignClient(name = "teamFeignClientCustom", url = "http://yareyare.co.kr")
public interface TeamFeignClientCustom {
    @GetMapping("/api/games/teams")
    TeamListRes teamList();
}
