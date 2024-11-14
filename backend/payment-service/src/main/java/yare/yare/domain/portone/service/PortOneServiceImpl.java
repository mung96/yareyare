package yare.yare.domain.portone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import yare.yare.domain.portone.dto.PortOnePriceRes;
import yare.yare.domain.portone.dto.PortOneRefreshTokenReq;
import yare.yare.domain.portone.dto.PortOneTokenReq;
import yare.yare.domain.portone.dto.PortOneTokenRes;
import yare.yare.domain.portone.feign_client.PortOneFeignClientCustom;
import yare.yare.global.utils.RedisUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class PortOneServiceImpl implements PortOneService {
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String PAYMENT_PREFIX = "paymentId-";

    @Value("${PORT_ONE_SECRET}")
    private String apiSecret;

    private final PortOneFeignClientCustom portOneFeignClientCustom;
    private final RedisUtils redisUtils;

    @Override
    public Integer getPrice(String paymentId) {
        String token = createToken();
        log.info("token %{}", token);
        PortOnePriceRes result = portOneFeignClientCustom.getPrice(PAYMENT_PREFIX+paymentId, token);
        log.info("result %{}", result.getResponse().getAmount().getTotal());
        return result.getResponse().getAmount().getTotal();
    }

    private String createToken() {
        String token = (String) redisUtils.getData("portOneAccessToken");

        if(token == null) {
            String refreshToken = (String) redisUtils.getData("portOneRefreshToken");

            if(refreshToken == null) {
                PortOneTokenReq portOneTokenReq = new PortOneTokenReq(apiSecret);

                PortOneTokenRes newToken = portOneFeignClientCustom.getToken(portOneTokenReq);

                log.info(newToken.getAccess_token());
                log.info(newToken.getRefresh_token());

                redisUtils.setDataWithExpiration("portOneAccessToken", newToken.getAccess_token(), 86300L);
                redisUtils.setDataWithExpiration("portOneRefreshToken", newToken.getRefresh_token(), 604000L);

                return TOKEN_PREFIX + newToken.getAccess_token();
            }

            return newAccessToken(refreshToken);
        }

        return TOKEN_PREFIX + token;
    }

    private String newAccessToken(String refreshToken) {
        PortOneRefreshTokenReq req = new PortOneRefreshTokenReq(refreshToken);
        PortOneTokenRes newToken = portOneFeignClientCustom.refreshToken(req);

        redisUtils.setDataWithExpiration("portOneAccessToken", newToken.getAccess_token(), 86300L);
        redisUtils.setDataWithExpiration("portOneRefreshToken", newToken.getRefresh_token(), 604000L);

        return TOKEN_PREFIX + newToken.getAccess_token();
    }
}
