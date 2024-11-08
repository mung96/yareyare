package yare.yare.domain.purchase.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;

import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static yare.yare.global.ResponseFieldUtils.getCommonResponseFields;
import static yare.yare.global.statuscode.SuccessCode.CREATED;
import static yare.yare.global.statuscode.SuccessCode.OK;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public class PurchaseTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void 결제_등록_성공() throws Exception {
        //given
        PurchaseAddReq req = new PurchaseAddReq();
        req.setIdempotencyKey("a3df30a8-65e3-425a-a286-2b7877b8e61e");
        req.setTotalPrice(23000);

        String content = objectMapper.writeValueAsString(req);

        //when
        ResultActions actions = mockMvc.perform(
                post("/api/payments")
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
                        "결제 등록 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Payment API")
                                .summary("결제 등록 API")
                                .requestFields(
                                        List.of(
                                                fieldWithPath("idempotencyKey").type(STRING)
                                                        .description("멱등키"),
                                                fieldWithPath("totalPrice").type(NUMBER)
                                                        .description("가격")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("결제 등록 Request"))
                                .responseSchema(Schema.schema("결제 등록 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 나의_티켓_예매_내역_조회_성공() throws Exception {
        //given


        //when
        ResultActions actions = mockMvc.perform(
                 get("/api/payments/tickets/purchases")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")

        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "나의 티켓 예매 내역 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Payment API")
                                .summary("나의 티켓 예매 내역 조회 API")
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.tickets[].purchaseId").type(NUMBER)
                                                        .description("구매 내역 ID"),
                                                fieldWithPath("body.tickets[].seasonName").type(STRING)
                                                        .description("시즌 이름"),
                                                fieldWithPath("body.tickets[].awayTeamName").type(STRING)
                                                        .description("원정 팀 이름"),
                                                fieldWithPath("body.tickets[].homeTeamName").type(STRING)
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.tickets[].reservationId").type(STRING)
                                                        .description("예매 내역 아이디(마지막 티켓 예매내역 아이디)"),
                                                fieldWithPath("body.tickets[].reservationDate").type(STRING)
                                                        .description("예매일"),
                                                fieldWithPath("body.tickets[].stadiumName").type(STRING)
                                                        .description("홈구장 이름"),
                                                fieldWithPath("body.tickets[].gameDateTime").type(STRING)
                                                        .description("경기 시작일"),
                                                fieldWithPath("body.tickets[].cancelDeadline").type(STRING)
                                                        .description("취소 가능 기한"),
                                                fieldWithPath("body.tickets[].purchaseStatus").type(STRING)
                                                        .description("예매 상태")
                                        )
                                )
                                .requestSchema(Schema.schema("나의 티켓 예매 내역 조회 Request"))
                                .responseSchema(Schema.schema("나의 티켓 예매 내역 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 나의_티켓_취소_내역_조회_성공() throws Exception {
        //given


        //when
        ResultActions actions = mockMvc.perform(
                get("/api/payments/tickets/cancellations")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")

        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "나의 티켓 취소 내역 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Payment API")
                                .summary("나의 티켓 취소 내역 조회 API")
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.tickets[].purchaseId").type(NUMBER)
                                                        .description("구매 내역 ID"),
                                                fieldWithPath("body.tickets[].seasonName").type(STRING)
                                                        .description("시즌 이름"),
                                                fieldWithPath("body.tickets[].awayTeamName").type(STRING)
                                                        .description("원정 팀 이름"),
                                                fieldWithPath("body.tickets[].homeTeamName").type(STRING)
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.tickets[].reservationId").type(STRING)
                                                        .description("예매 내역 아이디(마지막 티켓 예매내역 아이디)"),
                                                fieldWithPath("body.tickets[].reservationDate").type(STRING)
                                                        .description("예매일"),
                                                fieldWithPath("body.tickets[].stadiumName").type(STRING)
                                                        .description("홈구장 이름"),
                                                fieldWithPath("body.tickets[].gameDateTime").type(STRING)
                                                        .description("경기 시작일"),
                                                fieldWithPath("body.tickets[].cancelDeadline").type(STRING)
                                                        .description("취소 가능 기한"),
                                                fieldWithPath("body.tickets[].purchaseStatus").type(STRING)
                                                        .description("예매 상태")
                                        )
                                )
                                .requestSchema(Schema.schema("나의 티켓 취소 내역 조회 Request"))
                                .responseSchema(Schema.schema("나의 티켓 취소 내역 조회 Response"))
                                .build()
                        ))
                );
    }
}
