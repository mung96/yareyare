package yare.yare.domain.payment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import yare.yare.global.entity.BaseEntity;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = " UPDATE PurchasedSeat SET is_deleted = true WHERE purchase_seat_id = ? ")
@SQLRestriction("is_deleted = false")
public class PurchasedSeat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_seat_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;

    @NotNull
    @Column(length = 20)
    private String sectionName;

    @NotNull
    @Column(length = 20)
    private String rowName;

    @NotNull
    @Column(columnDefinition = "SMALLINT")
    private Integer seatNo;

    @NotNull
    @Column(name = "seat_id", columnDefinition = "INT UNSIGNED")
    private Long seatId;

    @NotNull
    private Integer unitPrice;

    @Column(unique = true, length = 36)
    private String ticketUuid;

    public void updateTicketUuid(String ticketUuid) {
        this.ticketUuid = ticketUuid;
    }
}
