package yare.yare.domain.payment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = " UPDATE PurchasedSeat SET is_deleted = true WHERE purchase_seat_id = ? ")
@SQLRestriction("is_deleted = false")
public class PurchasedSeat {
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
    private String seatNo;

    @NotNull
    @Column(name = "seat_id", columnDefinition = "INT UNSIGNED")
    private Long seatId;

    @NotNull
    private Integer unitPrice;

    @Column(unique = true, length = 36)
    private String ticketUuid;

    @NotNull
    private Boolean isDeleted;

    public void updateTicketUuid(String ticketUuid) {
        this.ticketUuid = ticketUuid;
    }
}
