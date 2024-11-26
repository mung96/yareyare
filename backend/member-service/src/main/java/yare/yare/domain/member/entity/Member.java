package yare.yare.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = " UPDATE Member SET is_deleted = true WHERE member_id = ? ")
@SQLRestriction("is_deleted = false")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(length = 50)
    private String name;

    @NotNull
    @Column(columnDefinition = "CHAR(36)", unique = true)
    private String uuid;

    @NotNull
    @Column(length = 320, unique = true)
    private String email;

    @Column(columnDefinition = "CHAR(11)")
    private String tel;

    private LocalDate birth;

    @Column(columnDefinition = "INT UNSIGNED")
    private Integer myTeamId;

    @Column(length = 50)
    private String myTeamName;

    @NotNull
    @Column(name = "ipv4_address", length = 15)
    private String ipv4Address;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    private String providerType;

    @NotNull
    private Boolean isDeleted;

    @NotNull
    private Boolean isCertificated;

    @NotNull
    @CreatedDate
    private LocalDateTime createdAt;

    @NotNull
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public void updateName(String name) {
        this.name = name;
    }

    public void updateBirth(LocalDate birth) {
        this.birth = birth;
    }

    public void updateTel(String tel) {
        this.tel = tel;
    }

    public void updateIsCertificated(Boolean isCertificated) {
        this.isCertificated = isCertificated;
    }

    public void updateMyTeamId(Integer myTeamId) {
        this.myTeamId = myTeamId;
    }

    public void updateMyTeamName(String myTeamName) {
        this.myTeamName = myTeamName;
    }
}
