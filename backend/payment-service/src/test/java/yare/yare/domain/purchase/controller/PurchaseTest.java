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
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.payment.dto.TicketDto;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;
import yare.yare.domain.payment.service.PurchaseService;
import yare.yare.global.auth.JwtTokenService;
import yare.yare.global.dto.SliceDto;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
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

    @MockBean
    private PurchaseService purchaseService;

    @MockBean
    private JwtTokenService jwtTokenService;

    private static final String JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6ImQwYTkyNDM0LTdjMDItNDZmZC04MmU4LTY2Y2U0OTMxYjhhZiIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzE0MTQ4Njd9.gHTHN0mufDhfasY7xB5dyO6kmt0dNghKBvCevwGYQJ2RsBenCvJpkhtrQ3qZfVHo7jUf5_4ApSn8sF9fTO-JTg";

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
        Pageable pageable = PageRequest.of(0, 10);

        ReservationListRes result = new ReservationListRes();
        List<TicketDto> tickets = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            TicketDto ticket = TicketDto.builder()
                    .purchaseId((long) i)
                    .seasonName("2024 신한SOL뱅크 KBO 리그")
                    .awayTeamName("두산")
                    .homeTeamName("기아")
                    .reservationId("T327135"+(i+1))
                    .reservationDate("2024.06.08")
                    .stadiumName("잠실야구장")
                    .gameDateTime("2024.06.13(목) 18:30")
                    .cancelDeadline("2024.06.12(수) 23:59")
                    .purchaseStatus("예매완료")
                    .build();

            tickets.add(ticket);
        }

        Slice<TicketDto> slice = new SliceImpl<>(tickets, pageable, true);
        result.setTickets(new SliceDto<>(slice));

        when(purchaseService.reservationList(any(), isNull(), eq(pageable)))
                .thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                 get("/api/payments/tickets/purchases")
                        .header("Authorization", "Bearer " + JWT_TOKEN)
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
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.tickets.content[].purchaseId").type(NUMBER)
                                                        .description("구매 내역 ID"),
                                                fieldWithPath("body.tickets.content[].seasonName").type(STRING)
                                                        .description("시즌 이름"),
                                                fieldWithPath("body.tickets.content[].awayTeamName").type(STRING)
                                                        .description("원정 팀 이름"),
                                                fieldWithPath("body.tickets.content[].homeTeamName").type(STRING)
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.tickets.content[].reservationId").type(STRING)
                                                        .description("예매 내역 아이디(마지막 티켓 예매내역 아이디)"),
                                                fieldWithPath("body.tickets.content[].reservationDate").type(STRING)
                                                        .description("예매일"),
                                                fieldWithPath("body.tickets.content[].stadiumName").type(STRING)
                                                        .description("홈구장 이름"),
                                                fieldWithPath("body.tickets.content[].gameDateTime").type(STRING)
                                                        .description("경기 시작일"),
                                                fieldWithPath("body.tickets.content[].cancelDeadline").type(STRING)
                                                        .description("취소 가능 기한"),
                                                fieldWithPath("body.tickets.content[].purchaseStatus").type(STRING)
                                                        .description("예매 상태"),
                                                fieldWithPath("body.tickets.page").type(NUMBER)
                                                        .description("페이지 Number"),
                                                fieldWithPath("body.tickets.size").type(NUMBER)
                                                        .description("페이지 크기"),
                                                fieldWithPath("body.tickets.hasNext").type(BOOLEAN)
                                                        .description("다음 페이지 존재 여부")
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
        Pageable pageable = PageRequest.of(0, 10);

        CancelReservationListRes result = new CancelReservationListRes();
        List<TicketDto> tickets = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            TicketDto ticket = TicketDto.builder()
                    .purchaseId((long) i)
                    .seasonName("2024 신한SOL뱅크 KBO 리그")
                    .awayTeamName("두산")
                    .homeTeamName("기아")
                    .reservationId("T327135"+(i+1))
                    .reservationDate("2024.06.08")
                    .stadiumName("잠실야구장")
                    .gameDateTime("2024.06.13(목) 18:30")
                    .cancelDeadline("2024.06.12(수) 23:59")
                    .purchaseStatus("취소완료")
                    .build();

            tickets.add(ticket);
        }

        Slice<TicketDto> slice = new SliceImpl<>(tickets, pageable, true);
        result.setTickets(new SliceDto<>(slice));

        when(purchaseService.cancelReservationList(any(), isNull(), eq(pageable)))
                .thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/payments/tickets/cancellations")
                        .header("Authorization", "Bearer " + JWT_TOKEN)
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
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.tickets.content[].purchaseId").type(NUMBER)
                                                        .description("구매 내역 ID"),
                                                fieldWithPath("body.tickets.content[].seasonName").type(STRING)
                                                        .description("시즌 이름"),
                                                fieldWithPath("body.tickets.content[].awayTeamName").type(STRING)
                                                        .description("원정 팀 이름"),
                                                fieldWithPath("body.tickets.content[].homeTeamName").type(STRING)
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.tickets.content[].reservationId").type(STRING)
                                                        .description("예매 내역 아이디(마지막 티켓 예매내역 아이디)"),
                                                fieldWithPath("body.tickets.content[].reservationDate").type(STRING)
                                                        .description("예매일"),
                                                fieldWithPath("body.tickets.content[].stadiumName").type(STRING)
                                                        .description("홈구장 이름"),
                                                fieldWithPath("body.tickets.content[].gameDateTime").type(STRING)
                                                        .description("경기 시작일"),
                                                fieldWithPath("body.tickets.content[].cancelDeadline").type(STRING)
                                                        .description("취소 가능 기한"),
                                                fieldWithPath("body.tickets.content[].purchaseStatus").type(STRING)
                                                        .description("예매 상태"),
                                                fieldWithPath("body.tickets.page").type(NUMBER)
                                                        .description("페이지 Number"),
                                                fieldWithPath("body.tickets.size").type(NUMBER)
                                                        .description("페이지 크기"),
                                                fieldWithPath("body.tickets.hasNext").type(BOOLEAN)
                                                        .description("다음 페이지 존재 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("나의 티켓 취소 내역 조회 Request"))
                                .responseSchema(Schema.schema("나의 티켓 취소 내역 조회 Response"))
                                .build()
                        ))
                );
    }
}
