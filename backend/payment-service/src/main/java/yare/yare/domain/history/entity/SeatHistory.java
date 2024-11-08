package yare.yare.domain.history.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import yare.yare.domain.payment.entity.Purchase;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = " UPDATE SeatHistory SET is_deleted = true WHERE seat_history = ? ")
public class SeatHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_history", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_hisotry_id")
    private PurchaseHistory purchaseHistory;

    private Integer unitPrice;

    @Column(columnDefinition = "INT UNSIGNED")
    private Long seatId;
}
