package yare.yare.domain.game.controller;

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
import yare.yare.domain.game.dto.ReserveSeatReq;

import java.util.ArrayList;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static yare.yare.global.ResponseFieldUtils.getCommonResponseFields;
import static yare.yare.global.statuscode.SuccessCode.CREATED;
import static yare.yare.global.statuscode.SuccessCode.OK;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public class GameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void 경기_일정_조회_팀_선택X_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/games")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );
        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "경기 일정 조회 성공(팀 선택 X)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("경기 일정 조회 API(팀 선택 X)")
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.games").type(ARRAY).optional()
                                                        .description("경기 목록"),
                                                fieldWithPath("body.games[].gameId").type(NUMBER).optional()
                                                        .description("경기 아이디"),
                                                fieldWithPath("body.games[].gameDate").type(STRING).optional()
                                                        .description("경기 시작 날짜"),
                                                fieldWithPath("body.games[].startTime").type(STRING).optional()
                                                        .description("경기 시작 시간"),
                                                fieldWithPath("body.games[].stadiumName").type(STRING).optional()
                                                        .description("경기장"),
                                                fieldWithPath("body.games[].homeTeamName").type(STRING).optional()
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.games[].homeTeamLogo").type(STRING).optional()
                                                        .description("홈 팀 로고"),
                                                fieldWithPath("body.games[].awayTeamName").type(STRING).optional()
                                                        .description("어웨이 팀 이름"),
                                                fieldWithPath("body.games[].awayTeamLogo").type(STRING).optional()
                                                        .description("어웨이 팀 로고"),
                                                fieldWithPath("body.games[].ticketOpenTime").type(STRING).optional()
                                                        .description("티켓 판매 예정 시간")
                                        )
                                )
                                .requestSchema(Schema.schema("경기 일정 조회 Request(팀 선택 X)"))
                                .responseSchema(Schema.schema("경기 일정 조회 Response(팀 선택 X)"))
                                .build()
                        ))
                );
    }

    @Test
    public void 경기_일정_조회_팀_선택O_성공() throws Exception {
        //given
        Integer teamId = 1;
        //when
        ResultActions actions = mockMvc.perform(
                get("/games/teams/{teamId}", teamId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );
        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "경기 일정 조회 성공(팀 선택 O)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("경기 일정 조회 API(팀 선택 O)")
                                .pathParameters(
                                        parameterWithName("teamId").description("조회할 팀 아이디")
                                )
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.games").type(ARRAY).optional()
                                                        .description("경기 목록"),
                                                fieldWithPath("body.games[].gameId").type(NUMBER).optional()
                                                        .description("경기 아이디"),
                                                fieldWithPath("body.games[].gameDate").type(STRING).optional()
                                                        .description("경기 시작 날짜"),
                                                fieldWithPath("body.games[].startTime").type(STRING).optional()
                                                        .description("경기 시작 시간"),
                                                fieldWithPath("body.games[].stadiumName").type(STRING).optional()
                                                        .description("경기장"),
                                                fieldWithPath("body.games[].homeTeamName").type(STRING).optional()
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.games[].homeTeamLogo").type(STRING).optional()
                                                        .description("홈 팀 로고"),
                                                fieldWithPath("body.games[].awayTeamName").type(STRING).optional()
                                                        .description("어웨이 팀 이름"),
                                                fieldWithPath("body.games[].awayTeamLogo").type(STRING).optional()
                                                        .description("어웨이 팀 로고"),
                                                fieldWithPath("body.games[].ticketOpenTime").type(STRING).optional()
                                                        .description("티켓 판매 예정 시간")
                                        )
                                )
                                .requestSchema(Schema.schema("경기 일정 조회 Request(팀 선택 O)"))
                                .responseSchema(Schema.schema("경기 일정 조회 Response(팀 선택 O)"))
                                .build()
                        ))
                );
    }

    @Test
    public void 경기_상세_정보_조회_성공() throws Exception {
        //given
        Long gameId = 1L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/games/{gameId}/details", gameId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "경기 상세 정보 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("경기 상세 정보 조회 API")
                                .pathParameters(
                                        parameterWithName("gameId").description("조회할 경기 아이디")
                                )
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.seasonName").type(STRING)
                                                        .description("시즌 이름"),
                                                fieldWithPath("body.homeTeamName").type(STRING)
                                                        .description("홈 팀 이름"),
                                                fieldWithPath("body.awayTeamName").type(STRING)
                                                        .description("어웨이 팀 이름"),
                                                fieldWithPath("body.gameDate").type(STRING)
                                                        .description("경기 날짜"),
                                                fieldWithPath("body.startTime").type(STRING)
                                                        .description("경기 시간"),
                                                fieldWithPath("body.stadiumName").type(STRING)
                                                        .description("경기 구장")
                                        )
                                )
                                .requestSchema(Schema.schema("경기 상세 정보 조회 Request"))
                                .responseSchema(Schema.schema("경기 상세 정보 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 등급별_잔여_좌석_조회_성공() throws Exception {
        //given
        Long gameId = 1L;

        //when
        ResultActions actions = mockMvc.perform(
                get("/games/{gameId}/grades", gameId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "등급별 잔여 좌석 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("등급별 잔여 좌석 조회 API")
                                .pathParameters(
                                        parameterWithName("gameId").description("조회할 경기 아이디")
                                )
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.grades[].gradeId").type(NUMBER)
                                                        .description("좌석 등급 아이디"),
                                                fieldWithPath("body.grades[].gradeName").type(STRING)
                                                        .description("좌석 등급 명"),
                                                fieldWithPath("body.grades[].availableSeats").type(NUMBER)
                                                        .description("잔여 좌석 수")
                                        )
                                )
                                .requestSchema(Schema.schema("등급별 잔여 좌석 조회 Request"))
                                .responseSchema(Schema.schema("등급별 잔여 좌석 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 구역_내_잔여_좌석_조회_성공() throws Exception {
        //given
        Long gameId = 1L;
        Integer gradeId = 1;

        //when
        ResultActions actions = mockMvc.perform(
                get("/games/{gameId}/seats", gameId)
                        .param("gradeId", gradeId.toString())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "구역 내 잔여 좌석 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("구역 내 잔여 좌석 조회 API")
                                .pathParameters(
                                        parameterWithName("gameId").description("조회할 경기 아이디")
                                )
                                .queryParameters(
                                        parameterWithName("gradeId").description("좌석 등급 아이디")
                                )
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.sections[].sectionName").type(STRING)
                                                        .description("좌석 구역 이름"),
                                                fieldWithPath("body.sections[].rows[].rowName").type(STRING)
                                                        .description("좌석 행 이름"),
                                                fieldWithPath("body.sections[].rows[].seats[].seatId").type(NUMBER)
                                                        .description("좌석 아이디"),
                                                fieldWithPath("body.sections[].rows[].seats[].seatNumber").type(NUMBER)
                                                        .description("좌석 열 이름"),
                                                fieldWithPath("body.sections[].rows[].seats[].isAvailable").type(BOOLEAN)
                                                        .description("좌석 예매 가능 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("등급별 잔여 좌석 조회 Request"))
                                .responseSchema(Schema.schema("등급별 잔여 좌석 조회 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 좌석_선택_성공() throws Exception {
        //given
        Long gameId = 1L;
        ReserveSeatReq req = new ReserveSeatReq();
        List<Long> seats = new ArrayList<>();
        seats.add(1L);
        seats.add(2L);
        req.setSeats(seats);
        String content = objectMapper.writeValueAsString(req);

        //when
        ResultActions actions = mockMvc.perform(
                post("/games/{gameId}/seats", gameId)
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
                        "좌석 선택 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("좌석 선택 API")
                                .pathParameters(
                                        parameterWithName("gameId").description("조회할 경기 아이디")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("seats").type(ARRAY).description("예약할 좌석 아이디 리스트")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.price").type(NUMBER)
                                                        .description("결제 가격")
                                        )
                                )
                                .requestSchema(Schema.schema("좌석 선택 Request"))
                                .responseSchema(Schema.schema("좌석 선택 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 경기_스케줄_조회_성공() throws Exception {
        //given
        Integer teamId = 1;
        Integer year = 2024;
        Integer month = 5;

        //when
        ResultActions actions = mockMvc.perform(
                get("/games/teams/{teamId}/schedule", teamId)
                        .param("year", year.toString())
                        .param("month", month.toString())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "경기 스케줄 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("경기 스케줄 조회 API")
                                .pathParameters(
                                        parameterWithName("teamId").description("조회할 팀 아이디")
                                )
                                .queryParameters(
                                        parameterWithName("year").description("조회할 년도(예: 2024)"),
                                        parameterWithName("month").description("조회할 달(예: 5)")
                                )
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.schedules[].gameDate").type(STRING)
                                                        .description("경기 날짜"),
                                                fieldWithPath("body.schedules[].startTime").type(STRING)
                                                        .description("경기 시간"),
                                                fieldWithPath("body.schedules[].opponentTeamLogo").type(STRING)
                                                        .description("상대 팀 로고"),
                                                fieldWithPath("body.schedules[].gameStatus").type(STRING)
                                                        .description("승패 여부"),
                                                fieldWithPath("body.schedules[].region").type(STRING)
                                                        .description("경기 지역"),
                                                fieldWithPath("body.schedules[].isHome").type(BOOLEAN)
                                                        .description("홈 경기 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("경기 스케줄 조회 Request"))
                                .responseSchema(Schema.schema("경기 스케줄 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 최근_경기_결과_조회_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/games/results")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "최근 경기 결과 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Game API")
                                .summary("최근 경기 결과 조회 API")
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.gameDate").type(STRING)
                                                        .description("경기 결과 기준 날짜"),
                                                fieldWithPath("body.results[].homeTeamScore").type(NUMBER).optional()
                                                        .description("홈 팀 점수"),
                                                fieldWithPath("body.results[].homeTeamLogo").type(STRING)
                                                        .description("홈 팀 로고"),
                                                fieldWithPath("body.results[].awayTeamScore").type(NUMBER).optional()
                                                        .description("어웨이 팀 점수"),
                                                fieldWithPath("body.results[].awayTeamLogo").type(STRING)
                                                        .description("어웨이 팀 로고"),
                                                fieldWithPath("body.results[].gameStatus").type(STRING)
                                                        .description("승패 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("최근 경기 결과 조회 Request"))
                                .responseSchema(Schema.schema("최근 경기 결과 조회 Response"))
                                .build()
                        ))
                );

    }

}
