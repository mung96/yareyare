package yare.yare.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yare.yare.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmailAndProviderType(String email, String provider);
}
