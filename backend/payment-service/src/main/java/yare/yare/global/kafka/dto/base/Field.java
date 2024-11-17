package yare.yare.global.kafka.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Field {
    private String type;

    private Boolean optional;

    private String field;
}


