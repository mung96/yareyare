package yare.yare.domain.payment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import yare.yare.domain.payment.enums.Vendor;
import yare.yare.global.entity.BaseEntity;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "UPDATE Purchase SET is_deleted = true WHERE purchase_id = ?")
@Where(clause = "is_deleted = false")
public class Purchase extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @NotNull
    @Column(name = "member_uuid", columnDefinition = "CHAR(36)")
    private String memberUuid;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Vendor vendor;

    @NotNull
    @Column(name = "idempotency_key", columnDefinition = "CHAR(36)", unique = true)
    private String idempotencyKey;

    @NotNull
    private Integer totalPrice;

    @NotNull
    private Boolean canceled;

    @Column(length = 36)
    private String reservationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @NotNull
    @Column(columnDefinition = "INT UNSIGNED")
    private Long gradeId;

    @NotNull
    private String gradeName;

    public void updateReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    public void updateCanceled(Boolean canceled) {
        this.canceled = canceled;
    }
}
