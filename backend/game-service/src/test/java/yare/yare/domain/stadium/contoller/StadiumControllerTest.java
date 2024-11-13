package yare.yare.domain.stadium.contoller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static yare.yare.global.ResponseFieldUtils.getCommonResponseFields;
import static yare.yare.global.statuscode.SuccessCode.OK;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public class StadiumControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void 구장_모양_조회_성공() throws Exception {
        //given
        String gradeId = "1";

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/games/stadiums")
                        .param("gradeId", gradeId)
                        .accept(APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.message").value(OK.getMessage()))
                .andDo(document(
                        "구장 모양 조회 API(등급 별)",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Stadium API")
                                .summary("구장 모양 조회 API(등급 별)")
                                .requestFields()
                                .queryParameters(
                                        parameterWithName("gradeId").description("등급 id")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.sections").type(ARRAY)
                                                        .description("구역 목록"),
                                                fieldWithPath("body.sections[].sectionName").type(STRING)
                                                        .description("구역 이름"),
                                                fieldWithPath("body.sections[].rows").type(ARRAY)
                                                        .description("행 목록"),
                                                fieldWithPath("body.sections[].rows[].rowName").type(STRING)
                                                        .description("행 이름"),
                                                fieldWithPath("body.sections[].rows[].seats").type(ARRAY)
                                                        .description("좌석 목록"),
                                                fieldWithPath("body.sections[].rows[].seats[].seatNumber").type(NUMBER)
                                                        .description("좌석 번호")
                                        )
                                )
                                .requestSchema(Schema.schema("구장 모양 조회 API(등급 별)"))
                                .responseSchema(Schema.schema("구장 모양 조회 API(등급 별)"))
                                .build()
                        ))
                );
    }


}
