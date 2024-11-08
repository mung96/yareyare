package yare.yare.domain.history.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

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
    @Column(name = "member_uuid", columnDefinition = "CHAR(36)", unique = true)
    private String memberUuid;

    @NotNull
    @Column(name = "grade_id", columnDefinition = "INT UNSIGNED")
    private Long gradeId;

    private Integer totalPrice;

    @NotNull
    @CreatedDate
    private LocalDateTime createdAt;
}
