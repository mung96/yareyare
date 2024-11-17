package yare.yare.domain.portone.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class PortOneCancelRes {
    private Cancellation cancellation;

    @Getter
    public static class Cancellation {
        private String status;

    }
}
