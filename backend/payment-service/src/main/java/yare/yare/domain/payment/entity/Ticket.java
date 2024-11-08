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
@SQLDelete(sql = " UPDATE Ticket SET is_deleted = true WHERE ticket_id = ? ")
@SQLRestriction("is_deleted = false")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @OneToOne
    @JoinColumn(name = "purchase_seat_id")
    private PurchasedSeat purchasedSeat;

    @NotNull
    @Column(length = 100)
    private String stadiumImg;

    @NotNull
    @Column(length = 100)
    private String qrImg;

    @NotNull
    private Boolean isDeleted;
}
