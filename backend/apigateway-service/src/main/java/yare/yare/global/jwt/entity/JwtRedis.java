package yare.yare.global.jwt.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@RedisHash(value = "jwt_redis")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtRedis {
    @Id
    private String uuid; // key : (uuid : 실제 uuid값)

    private Long memberId;

    private String refreshToken;
}

