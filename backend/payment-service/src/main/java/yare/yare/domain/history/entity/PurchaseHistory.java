package yare.yare.domain.history.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_history_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @NotNull
    @Column(name = "member_uuid", columnDefinition = "CHAR(36)")
    private String memberUuid;

    @NotNull
    @Column(name = "game_id", columnDefinition = "INT UNSIGNED")
    private Long gameId;

    private Integer totalPrice;

    @CreatedDate
    private LocalDateTime createdAt;

    public void updateTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }
}
