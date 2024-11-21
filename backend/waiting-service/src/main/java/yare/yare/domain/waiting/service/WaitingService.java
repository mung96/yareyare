package yare.yare.domain.waiting.service;

import yare.yare.domain.waiting.dto.JoinQueueReq;

public interface WaitingService {
    String joinQueue(String memberId, JoinQueueReq joinQueueReq, String sessionId);
}
