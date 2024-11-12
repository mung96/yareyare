package yare.yare.global.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class UnlockEvent extends ApplicationEvent {

    private final String key;

    public UnlockEvent(Object source, String key) {
        super(source);
        this.key = key;
    }
}
