package yare.yare.domain.portone.service;

public interface PortOneService {
    Integer getPrice(String paymentId);
    Boolean cancelPortOne(String paymentId);
}
