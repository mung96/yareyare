package yare.yare.domain.portone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortOneCancelReq {
    private String reason = "예매 취소";
}
