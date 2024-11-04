package yare.yare.domain.game.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class ReserveSeatReq {

    @NotEmpty
    private List<Long> seats;
}