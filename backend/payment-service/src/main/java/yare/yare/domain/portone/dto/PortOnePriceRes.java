package yare.yare.domain.portone.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class PortOnePriceRes {
    private Response response;

    @Getter
    public static class Response {
        private Amount amount;

        @Getter
        public static class Amount {
            private Integer total;
        }
    }
}
