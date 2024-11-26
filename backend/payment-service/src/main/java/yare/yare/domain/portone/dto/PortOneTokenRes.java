package yare.yare.domain.portone.dto;

import lombok.Data;

@Data
public class PortOneTokenRes {
    private String accessToken;

    private String refreshToken;
}