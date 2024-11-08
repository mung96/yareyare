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
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.history.dto.SeatDto;
import yare.yare.domain.history.dto.request.PurchaseHistoryAddReq;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
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
public class PurchaseHistoryTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void 결제_히스토리_등록_성공() throws Exception {
        //given
        PurchaseHistoryAddReq req = new PurchaseHistoryAddReq();
        List<SeatDto> seats = new ArrayList<>();
        seats.add(new SeatDto(1L));
        seats.add(new SeatDto(2L));

        req.setGameId(1L);
        req.setSeats(seats);

        String content = objectMapper.writeValueAsString(req);

        //when
        ResultActions actions = mockMvc.perform(
                post("/api/payments/history")
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
                                                        .description("예약할 좌석 아이디")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.idempotencyKey").type(STRING)
                                                        .description("멱등키"),
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
