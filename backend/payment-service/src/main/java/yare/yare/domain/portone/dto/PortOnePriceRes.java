package yare.yare.domain.portone.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class PortOnePriceRes {
    private Amount amount;

    @Getter
    public static class Amount {
        private Integer total;

    }
}
