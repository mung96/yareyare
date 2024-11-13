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
public class SeatHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_history", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_hisotry_id")
    private PurchaseHistory purchaseHistory;

    @NotNull
    private Integer unitPrice;

    @NotNull
    @Column(columnDefinition = "INT UNSIGNED")
    private Long seatId;

    @CreatedDate
    private LocalDateTime createdAt;
}
