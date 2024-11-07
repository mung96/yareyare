package yare.yare.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import yare.yare.domain.member.entity.Member;

@Data
@Builder
@AllArgsConstructor
public class MyTeamModifyRes {
    private Integer myTeamId;

    public static MyTeamModifyRes toDto(Member member) {
        return MyTeamModifyRes.builder()
                .myTeamId(member.getMyTeamId())
                .build();
    }
}
