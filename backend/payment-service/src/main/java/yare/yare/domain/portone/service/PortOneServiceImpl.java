package yare.yare.domain.portone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import yare.yare.domain.portone.dto.*;
import yare.yare.domain.portone.feign_client.PortOneFeignClientCustom;
import yare.yare.global.utils.RedisUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class PortOneServiceImpl implements PortOneService {
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String PAYMENT_PREFIX = "paymentId-";
    private static final String SUCCESS_MESSAGE = "SUCCEEDED";
    private static final PortOneCancelReq CANCEL_REQ = new PortOneCancelReq();

    @Value("${PORT_ONE_SECRET}")
    private String apiSecret;

    private final PortOneFeignClientCustom portOneFeignClientCustom;
    private final RedisUtils redisUtils;

    @Override
    public Integer getPrice(String paymentId) {
        String token = createToken();
        PortOnePriceRes result = portOneFeignClientCustom.getPrice(PAYMENT_PREFIX+paymentId, token);

        return result.getAmount().getTotal();
    }

    @Override
    public Boolean cancelPortOne(String paymentId) {
        String token = createToken();
        PortOneCancelRes result = portOneFeignClientCustom.cancelPayment(PAYMENT_PREFIX+paymentId, CANCEL_REQ, token);

        return result.getCancellation().getStatus().equals(SUCCESS_MESSAGE);
    }

    private String createToken() {
        PortOneTokenReq portOneTokenReq = new PortOneTokenReq(apiSecret);

        PortOneTokenRes newToken = portOneFeignClientCustom.getToken(portOneTokenReq);

        return TOKEN_PREFIX + newToken.getAccessToken();
    }
}
