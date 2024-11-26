package yare.yare.domain.ci.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yare.yare.domain.ci.entity.Ci;
import yare.yare.domain.member.entity.Member;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CiAddReq {
    private String impUid;

    public Ci toEntity(String value, Member member) {
        return Ci.builder()
                .value(value)
                .member(member)
                .build();
    }
}
