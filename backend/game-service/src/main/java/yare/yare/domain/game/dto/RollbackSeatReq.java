package yare.yare.domain.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class RollbackSeatReq {

    @NotBlank
    private String idempotentKey;

    @NotEmpty
    private List<Long> seats;

}
