package yare.yare.global;

import org.springframework.restdocs.payload.FieldDescriptor;

import java.util.ArrayList;
import java.util.List;

import static javax.management.openmbean.SimpleType.STRING;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public class ResponseFieldUtils {
    public static List<FieldDescriptor> getCommonResponseFields(FieldDescriptor... additionalFields) {
        List<FieldDescriptor> responseFields = new ArrayList<>();

        responseFields.add(fieldWithPath("header.message").type(STRING).description("응답 메시지"));

        if (additionalFields != null && additionalFields.length > 0) {
            responseFields.addAll(List.of(additionalFields));
        }
        return responseFields;
    }
}
