package yare.yare.global.kafka.Consumer;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import java.util.HashMap;
import java.util.Map;

import static org.apache.kafka.clients.consumer.ConsumerConfig.*;

@Configuration
@EnableKafka
@RequiredArgsConstructor
public class KafkaConsumerConfig {

    private final Environment env;

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {

        Map<String, Object> properties = new HashMap<>();

        properties.put(BOOTSTRAP_SERVERS_CONFIG, env.getProperty("kafka.endpoint"));
        properties.put(GROUP_ID_CONFIG, env.getProperty("kafka.group_id"));
        properties.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        properties.put(VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(properties);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, String> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(consumerFactory());

        return factory;
    }
}
