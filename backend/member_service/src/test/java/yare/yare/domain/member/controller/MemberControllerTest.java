package yare.yare.domain.member.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.member.dto.response.MemberDetailsRes;
import yare.yare.domain.member.service.MemberService;
import yare.yare.global.jwt.service.JwtService;

import java.time.LocalDate;
import java.util.List;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static java.lang.Boolean.TRUE;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static yare.yare.global.ResponseFieldUtils.getCommonResponseFields;
import static yare.yare.global.statuscode.SuccessCode.OK;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
class MemberControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberService memberService;

    private String jwtToken;

    @BeforeEach
    public void setup() throws JsonProcessingException {
        jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ";

        when(jwtService.createAccessToken(UUID, isCertificated))
                .thenReturn(jwtToken);
        when(jwtService.getAuthentication(jwtToken))
                .thenReturn(new UsernamePasswordAuthenticationToken(123L, null, List.of()));

        SecurityContextHolder.getContext()
                .setAuthentication(new UsernamePasswordAuthenticationToken(123L, null, List.of()));
    }

    @Test
    @WithMockUser
    public void 내_정보_조회_성공() throws Exception {
        // given
        MemberDetailsRes result = MemberDetailsRes.builder()
                .name("박동환")
                .birth(LocalDate.parse("1999-02-01"))
                .tel("01074544231")
                .email("srpark13@naver.com")
                .myTeamId(1)
                .myTeamName("기아 타이거즈")
                .isCertificated(TRUE)
                .uuid("박동환의 UUID")
                .build();
        when(memberService.getMemberDetails(anyLong()))
                .thenReturn(result);

        // when
        ResultActions actions = mockMvc.perform(
                get("/members")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "내 정보 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("내 정보 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.name").type(NUMBER).optional()
                                                        .description("이름"),
                                                fieldWithPath("body.birth").type(STRING).optional()
                                                        .description("생일"),
                                                fieldWithPath("body.tel").type(STRING).optional()
                                                        .description("전화번호"),
                                                fieldWithPath("body.email").type(STRING).optional()
                                                        .description("이메일"),
                                                fieldWithPath("body.myTeamId").type(NUMBER).optional()
                                                        .description("마이 팀 아이디"),
                                                fieldWithPath("body.myTeamName").type(STRING).optional()
                                                        .description("마이 팀 이름"),
                                                fieldWithPath("body.isCertificated").type(BOOLEAN).optional()
                                                        .description("본인인증 여부"),
                                                fieldWithPath("body.uuid").type(STRING).optional()
                                                        .description("UUID")
                                        )
                                )
                                .requestSchema(Schema.schema("내 정보 조회 Request"))
                                .responseSchema(Schema.schema("내 정보 조회 Response"))
                                .build()
                        ))
                );
    }
}
