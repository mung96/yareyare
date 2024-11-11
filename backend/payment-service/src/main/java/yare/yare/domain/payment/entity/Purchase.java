package yare.yare.domain.payment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import yare.yare.domain.payment.enums.Vendor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE Purchase SET is_deleted = true WHERE purchase_id = ?")
@Where(clause = "is_deleted = false")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @NotNull
    @Column(name = "member_id", columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Vendor vendor;

    @NotNull
    @CreatedDate
    private LocalDateTime createdAt;

    @NotNull
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @NotNull
    @Column(name = "idempotency_key", columnDefinition = "CHAR(36)", unique = true)
    private String idempotencyKey;

    @NotNull
    private Integer totalPrice;

    @NotNull
    private Boolean canceled;

    @NotNull
    @Column(length = 36)
    private String reservationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @NotNull
    private String gradeName;

    @NotNull
    private Boolean isDeleted;
}
