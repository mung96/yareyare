package yare.yare.domain.team.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static yare.yare.global.ResponseFieldUtils.getCommonResponseFields;
import static yare.yare.global.statuscode.SuccessCode.OK;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public class TeamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void 팀_리스트_조회() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/games/teams")
                        .accept(APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "팀 리스트 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Team API")
                                .summary("팀 리스트 조회")
                                .requestFields()
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.teams").type(ARRAY)
                                                        .description("팀 목록"),
                                                fieldWithPath("body.teams[].teamId").type(NUMBER)
                                                        .description("팀 아이디"),
                                                fieldWithPath("body.teams[].teamName").type(STRING)
                                                        .description("팀 이름"),
                                                fieldWithPath("body.teams[].teamLogo").type(STRING)
                                                        .description("팀 로고")
                                        )
                                )
                                .requestSchema(Schema.schema("팀 리스트 조회"))
                                .responseSchema(Schema.schema("팀 리스트 조회"))
                                .build()
                        ))
                );
    }
}
