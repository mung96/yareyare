package yare.yare.domain.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GameSeatStatusUpdateDto {

    @NotBlank
    private String idempotencyKey;

    @NotEmpty
    private List<Long> seatIds;

}
