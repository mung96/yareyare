package yare.yare.domain.waiting.service;

import yare.yare.domain.waiting.dto.JoinQueueReq;

public interface WaitingService {
    void joinQueue(String memberId, JoinQueueReq joinQueueReq);
}
