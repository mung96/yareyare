package yare.yare.domain.history.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yare.yare.domain.payment.entity.Game;
import yare.yare.global.entity.BaseEntity;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseHistory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_history_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @NotNull
    @Column(name = "member_uuid", columnDefinition = "CHAR(36)")
    private String memberUuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    private Integer totalPrice;

    @NotNull
    @Column(name = "idempotency_key", columnDefinition = "CHAR(36)", unique = true)
    private String idempotencyKey;

    @NotNull
    @Column(name = "grade_id", columnDefinition = "INT UNSIGNED")
    private Long gradeId;

    @NotNull
    private String gradeName;

    public void updateTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }
}
