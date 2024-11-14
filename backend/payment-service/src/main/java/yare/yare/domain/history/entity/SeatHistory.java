package yare.yare.domain.history.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yare.yare.global.entity.BaseEntity;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatHistory extends BaseEntity {
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
    @Column(length = 20)
    private String sectionName;

    @NotNull
    @Column(length = 20)
    private String rowName;

    @NotNull
    @Column(length = 20)
    private String seatNo;

    @NotNull
    @Column(name = "seat_id", columnDefinition = "INT UNSIGNED")
    private Long seatId;
}
