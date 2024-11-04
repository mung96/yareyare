package yare.yare.domain.fcm.entity;

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
public class Fcm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fcm_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @Column(length = 256, unique = true)
    private String token;

    @NotNull
    private Boolean approved;
}
