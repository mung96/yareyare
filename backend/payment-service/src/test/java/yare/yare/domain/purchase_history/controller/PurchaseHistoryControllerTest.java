package yare.yare.domain.purchase_history.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.game.feign_client.GameFeignClientCustom;
import yare.yare.domain.game.service.GameService;
import yare.yare.domain.history.controller.PurchaseHistoryController;
import yare.yare.domain.history.dto.SeatDto;
import yare.yare.domain.history.dto.request.PurchaseHistoryAddReq;
import yare.yare.domain.history.dto.response.PurchaseHistoryAddRes;
import yare.yare.domain.history.service.PurchaseHistoryService;
import yare.yare.global.auth.JwtTokenService;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.NUMBER;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.STRING;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static yare.yare.global.ResponseFieldUtils.getCommonResponseFields;
import static yare.yare.global.statuscode.SuccessCode.CREATED;


@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public class PurchaseHistoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PurchaseHistoryService purchaseHistoryService;

    private static final String JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6ImQwYTkyNDM0LTdjMDItNDZmZC04MmU4LTY2Y2U0OTMxYjhhZiIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzE0MTQ4Njd9.gHTHN0mufDhfasY7xB5dyO6kmt0dNghKBvCevwGYQJ2RsBenCvJpkhtrQ3qZfVHo7jUf5_4ApSn8sF9fTO-JTg";

    @Test
    public void 결제_히스토리_등록_성공() throws Exception {
        //given
        PurchaseHistoryAddReq req = new PurchaseHistoryAddReq();
        List<SeatDto> seats = new ArrayList<>();
        seats.add(new SeatDto(1L));
        seats.add(new SeatDto(2L));

        req.setGameId(693L);
        req.setSeats(seats);
        req.setIdempotencyKey("uuid");

        PurchaseHistoryAddRes result = new PurchaseHistoryAddRes();
        result.setTotalPrice(32000);

        String content = objectMapper.writeValueAsString(req);

        when(purchaseHistoryService.addPurchaseHistory(any(PurchaseHistoryAddReq.class), anyString()))
                .thenReturn(result);
        //when
        ResultActions actions = mockMvc.perform(
                post("/api/payments/history")
                        .header("Authorization", "Bearer " + JWT_TOKEN)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .characterEncoding("UTF-8")

        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.message").value(CREATED.getMessage()))
                .andDo(document(
                        "결제 히스토리 등록 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Payment API")
                                .summary("결제 히스토리 등록 API")
                                .requestFields(
                                        List.of(
                                                fieldWithPath("gameId").type(NUMBER)
                                                        .description("경기 아이디"),
                                                fieldWithPath("seats[].seatId").type(NUMBER)
                                                        .description("예약할 좌석 아이디"),
                                                fieldWithPath("idempotencyKey").type(STRING)
                                                        .description("멱등키")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.totalPrice").type(NUMBER)
                                                        .description("총 결제 금액")
                                        )
                                )
                                .requestSchema(Schema.schema("결제 히스토리 등록 Request"))
                                .responseSchema(Schema.schema("결제 히스토리 등록 Response"))
                                .build()
                        ))
                );
    }
}
