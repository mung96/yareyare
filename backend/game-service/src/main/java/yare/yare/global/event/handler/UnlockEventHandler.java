package yare.yare.global.event.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import yare.yare.global.event.UnlockEvent;
import yare.yare.global.utils.RedisUtil;

@Component
@RequiredArgsConstructor
public class UnlockEventHandler {

    private final RedisUtil redisUtil;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMPLETION)
    public void onUnlockEvent(UnlockEvent event) {
        String key = event.getKey();
        redisUtil.unlock(key);;
    }


}
