package yare.yare.domain.portone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PortOneTokenReq {
    private String apiSecret;
}