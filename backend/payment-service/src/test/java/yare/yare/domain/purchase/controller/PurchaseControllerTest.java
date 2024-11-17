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
import yare.yare.domain.payment.dto.SeatInfoDto;
import yare.yare.domain.payment.dto.TicketDto;
import yare.yare.domain.payment.dto.request.PurchaseAddReq;
import yare.yare.domain.payment.dto.response.CancelReservationListRes;
import yare.yare.domain.payment.dto.response.PurchaseDetailsRes;
import yare.yare.domain.payment.dto.response.ReservationListRes;
import yare.yare.domain.payment.service.PurchaseService;
import yare.yare.global.dto.SliceDto;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
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
public class PurchaseControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PurchaseService purchaseService;

    private static final String JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6ImQwYTkyNDM0LTdjMDItNDZmZC04MmU4LTY2Y2U0OTMxYjhhZiIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzE0MTQ4Njd9.gHTHN0mufDhfasY7xB5dyO6kmt0dNghKBvCevwGYQJ2RsBenCvJpkhtrQ3qZfVHo7jUf5_4ApSn8sF9fTO-JTg";

    @Test
    public void 결제_등록_성공() throws Exception {
        //given
        PurchaseAddReq req = new PurchaseAddReq();
        req.setIdempotencyKey("a3df30a8-65e3-425a-a286-2b7877b8e61e");
        req.setVendor("PAYMENT");

        String content = objectMapper.writeValueAsString(req);

        doNothing().when(purchaseService).addPurchase(any(PurchaseAddReq.class), anyString());

        //when
        ResultActions actions = mockMvc.perform(
                post("/api/payments")
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
                        "결제 등록 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Payment API")
                                .summary("결제 등록 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("idempotencyKey").type(STRING)
                                                        .description("멱등키"),
                                                fieldWithPath("vendor").type(STRING)
                                                        .description("결제 방법")
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
                 get("/api/payments/tickets/purchases?lastPurchaseId=",8L)
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
                                .queryParameters(
                                        parameterWithName("lastPurchaseId").optional()
                                                .description("마지막 조회된 구매 ID (페이징을 위한 ID)")
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
                get("/api/payments/tickets/cancellations?lastPurchaseId", 8L)
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
                                .queryParameters(
                                        parameterWithName("lastPurchaseId").optional()
                                                .description("마지막 조회된 구매 ID (페이징을 위한 ID)")
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

    @Test
    public void 나의_티켓_상세_조회_성공() throws Exception {
        //given
        PurchaseDetailsRes result = new PurchaseDetailsRes();

        List<SeatInfoDto> seats = new ArrayList<>();

        for(int i = 1; i <= 4; i++) {
            SeatInfoDto seatInfo = SeatInfoDto.builder()
                    .ticketId("T3271382"+i)
                    .gradeName("중앙테이블석")
                    .seatNo("111구역 A열 23")
                    .unitPrice("15,000")
                    .build();

            seats.add(seatInfo);
        }

        result.setImageUrl("https://yareyare-s3.s3.ap-northeast-2.amazonaws.com/logos/temp.png");
        result.setSeasonName("2024 신한SOL뱅크 KBO 리그");
        result.setHomeTeamName("두산");
        result.setAwayTeamName("LG");
        result.setStadiumName("잠실야구장");
        result.setGameDateTime("2024.07.25(목) 18:30");
        result.setReservationDate("2024.07.22");
        result.setStartTicketId("T32713821");
        result.setEndTicketId("T32713824");
        result.setTicketCount(4);
        result.setPurchaseStatus("예매완료");
        result.setTicketType("모바일티켓");
        result.setSeatPrice("80,000");
        result.setChargePrice("4,000");
        result.setTotalPrice("84,000");
        result.setSeats(seats);
        result.setCancelDeadline("2024.07.24(수) 23:59");

        when(purchaseService.purchaseDetails(anyString(), anyLong()))
                .thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/payments/tickets/{purchaseId}", 1L)
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
                        "나의 티켓 상세 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Payment API")
                                .summary("나의 티켓 상세 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("purchaseId")
                                                .description("구매 내역 ID")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.imageUrl").type(STRING)
                                                        .description("기본 이미지"),
                                                fieldWithPath("body.seasonName").type(STRING)
                                                        .description("시즌 이름"),
                                                fieldWithPath("body.awayTeamName").type(STRING)
                                                        .description("원정 팀 이름"),
                                                fieldWithPath("body.homeTeamName").type(STRING)
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.stadiumName").type(STRING)
                                                        .description("장소 이름"),
                                                fieldWithPath("body.gameDateTime").type(STRING)
                                                        .description("경기 시작일"),
                                                fieldWithPath("body.reservationDate").type(STRING)
                                                        .description("예매일"),
                                                fieldWithPath("body.startTicketId").type(STRING)
                                                        .description("첫번째 티켓 예매내역 아이디"),
                                                fieldWithPath("body.endTicketId").type(STRING)
                                                        .description("마지막 티켓 예매내역 아이디"),
                                                fieldWithPath("body.ticketCount").type(NUMBER)
                                                        .description("예매 티켓 개수"),
                                                fieldWithPath("body.purchaseStatus").type(STRING)
                                                        .description("티켓 상태"),
                                                fieldWithPath("body.ticketType").type(STRING)
                                                        .description("티켓 종류"),
                                                fieldWithPath("body.seatPrice").type(STRING)
                                                        .description("좌석 전체 가격"),
                                                fieldWithPath("body.chargePrice").type(STRING)
                                                        .description("예매 수수료"),
                                                fieldWithPath("body.totalPrice").type(STRING)
                                                        .description("전체 가격"),
                                                fieldWithPath("body.seats[].ticketId").type(NUMBER)
                                                        .description("티켓 아이디"),
                                                fieldWithPath("body.seats[].gradeName").type(NUMBER)
                                                        .description("좌석 등급"),
                                                fieldWithPath("body.seats[].seatNo").type(NUMBER)
                                                        .description("좌석 정보"),
                                                fieldWithPath("body.seats[].unitPrice").type(NUMBER)
                                                        .description("개별 가격"),
                                                fieldWithPath("body.cancelDeadline").type(STRING)
                                                        .description("취소 가능 기한")
                                        )
                                )
                                .requestSchema(Schema.schema("나의 티켓 상세 조회 Request"))
                                .responseSchema(Schema.schema("나의 티켓 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 티켓_취소_성공() throws Exception {
        //given
        doNothing().when(purchaseService).cancelPurchased(anyString(), anyLong());

        //when
        ResultActions actions = mockMvc.perform(
                post("/api/payments/{purchaseId}/cancel", 1L)
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
                        "결제 취소 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Payment API")
                                .summary("결제 취소 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("purchaseId")
                                                .description("구매 내역 ID")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("결제 취소 Request"))
                                .responseSchema(Schema.schema("결제 취소 Response"))
                                .build()
                        ))
                );
    }
}
