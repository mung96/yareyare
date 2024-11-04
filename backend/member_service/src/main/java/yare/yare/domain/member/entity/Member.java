package yare.yare.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @NotNull
    @Column(length = 50)
    private String name;

    @NotNull
    @Column(columnDefinition = "CHAR(36)", unique = true)
    private String uuid;

    @NotNull
    @Column(length = 320, unique = true)
    private String email;

    @NotNull
    @Column(columnDefinition = "CHAR(11)")
    private String tel;

    @NotNull
    private LocalDate birth;

    @Column(length = 50)
    private String myTeam;

    @NotNull
    @Column(length = 15)
    private String ipv4Address;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    @CreatedDate
    private LocalDateTime createdAt;

    @NotNull
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
