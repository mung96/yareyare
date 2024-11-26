package yare.yare.domain.portone.service;

import yare.yare.domain.portone.dto.response.PortOneCiRes;

public interface PortOneService {
    String getAccessToken();

    PortOneCiRes getPortOneToken(String imp_uid);
}
