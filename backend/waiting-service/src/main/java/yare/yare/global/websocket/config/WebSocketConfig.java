package yare.yare.global.websocket.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.WebSocketMessageBrokerStats;
import org.springframework.web.socket.config.annotation.*;
import yare.yare.global.jwt.JwtTokenService;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final JwtTokenService jwtTokenService;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue"); // 클라이언트가 구독할 경로
        registry.setApplicationDestinationPrefixes("/app"); // 클라이언트가 메시지를 보낼 경로
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
//                .withSockJS();
    }

    @Bean
    public WebSocketMessageBrokerStats webSocketStats() {
        WebSocketMessageBrokerStats webSocketMessageBrokerStats = new WebSocketMessageBrokerStats();
        webSocketMessageBrokerStats.setLoggingPeriod(TimeUnit.SECONDS.toMillis(10L));
        return webSocketMessageBrokerStats;
    }
}

