package yare.yare.domain.portone.dto;

import lombok.Data;

@Data
public class PortOneTokenRes {
    private String access_token;

    private String refresh_token;
}