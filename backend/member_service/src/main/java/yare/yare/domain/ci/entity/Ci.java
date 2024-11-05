package yare.yare.domain.ci.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yare.yare.domain.member.entity.Member;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ci {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ci_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @Column(name = "`value`")
    private String value;
}
