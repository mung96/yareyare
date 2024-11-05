package yare.yare.domain.ci.service;

import yare.yare.domain.ci.dto.request.CiAddReq;

public interface CiService {
    void addCi(CiAddReq req, Long memberId);
}
