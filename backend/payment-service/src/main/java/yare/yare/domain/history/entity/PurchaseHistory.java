package yare.yare.domain.history.entity;

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
@SQLDelete(sql = " UPDATE PurchaseHistory SET is_deleted = true WHERE purchase_history_id = ? ")
@SQLRestriction("is_deleted = false")
public class PurchaseHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_history_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @NotNull
    @Column(length = 50)
    private String name;

    @NotNull
    @Column(columnDefinition = "CHAR(6)")
    private String birthday;

    @NotNull
    @Column(columnDefinition = "CHAR(11)")
    private String phoneNumber;

    @NotNull
    @Column(length = 320)
    private String email;

    @NotNull
    private Integer totalPrice;
}
