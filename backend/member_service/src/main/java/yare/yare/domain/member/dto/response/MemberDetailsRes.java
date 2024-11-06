package yare.yare.domain.member.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import yare.yare.domain.member.entity.Member;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class MemberDetailsRes {
    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyMMdd")
    private LocalDate birth;

    private String tel;

    private String email;

    private String myTeam;

    private Boolean isCertificated;

    private String uuid;

    public static MemberDetailsRes toDto(Member member) {
        return MemberDetailsRes.builder()
                .name(member.getName())
                .birth(member.getBirth())
                .tel(member.getTel())
                .email(member.getEmail())
                .myTeam(member.getMyTeam())
                .isCertificated(member.getIsCertificated())
                .uuid(member.getUuid())
                .build();
    }
}
