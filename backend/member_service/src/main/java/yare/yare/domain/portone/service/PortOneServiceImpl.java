package yare.yare.domain.portone.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yare.yare.domain.portone.dto.request.PortOneTokenReq;
import yare.yare.domain.portone.dto.response.PortOneCiRes;
import yare.yare.domain.portone.dto.response.PortOneTokenRes;
import yare.yare.domain.portone.feigin_client.PortOneFeignClientCustom;
import yare.yare.global.exception.CustomException;
import yare.yare.global.utils.RedisUtils;

import static yare.yare.global.statuscode.ErrorCode.FAIL_PORTONE_IDENTIFIED;
import static yare.yare.global.statuscode.ErrorCode.FAIL_PORTONE_TOKEN;

@Service
@RequiredArgsConstructor
@Slf4j
public class PortOneServiceImpl implements PortOneService {
    @Value("${PORT_ONE_KEY}")
    private String apiKey;

    @Value("${PORT_ONE_SECRET}")
    private String apiSecret;

    private final PortOneFeignClientCustom portOneFeignClientCustom;
    private final RedisUtils redisUtils;

    @Override
    public String getAccessToken() {
        String token = (String) redisUtils.getData("portOne");
        if (token == null) {
            PortOneTokenReq req = new PortOneTokenReq(apiKey, apiSecret);
            PortOneTokenRes res;

            try {
                res = portOneFeignClientCustom.getToken(req);
            } catch (CustomException e) {
                throw new CustomException(FAIL_PORTONE_TOKEN);
            }

            log.info("token : {}", res);
            log.info("token : {}", res.getResponse().getAccess_token());

            token = "Bearer " + res.getResponse().getAccess_token();
            redisUtils.setDataWithExpiration("portOne", token, 1799L);
        }

        return token;
    }

    @Override
    public PortOneCiRes getPortOneToken(String imp_uid) {
        String token = getAccessToken();
        PortOneCiRes response;

        try {
            response = portOneFeignClientCustom.getCi(imp_uid, token);

            log.info("ci : {}", response);
        } catch (CustomException e) {
            throw new CustomException(FAIL_PORTONE_IDENTIFIED);
        }

        return response;
    }
}
