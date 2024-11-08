package yare.yare.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberAccessTokenRes {
    private String accessToken;
}
