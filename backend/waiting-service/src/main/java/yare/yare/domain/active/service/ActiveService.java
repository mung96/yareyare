package yare.yare.domain.active.service;

public interface ActiveService {
    void addActiveMember(Long gameId, String memberId, String token);
}
