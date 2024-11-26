package yare.yare.domain.ci.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.ci.dto.request.CiAddReq;
import yare.yare.domain.ci.entity.Ci;
import yare.yare.domain.ci.repository.CiRepository;
import yare.yare.domain.member.entity.Member;
import yare.yare.domain.member.repository.MemberRepository;
import yare.yare.domain.portone.dto.response.PortOneCiRes;
import yare.yare.domain.portone.service.PortOneService;
import yare.yare.global.exception.CustomException;

import java.time.LocalDate;

import static yare.yare.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional
public class CiServiceImpl implements CiService {
    private final MemberRepository memberRepository;
    private final CiRepository ciRepository;
    private final PortOneService portOneService;

    @Override
    public void addCi(CiAddReq req, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        if(!ciRepository.existsCiByMember(member.getId())) {
            PortOneCiRes portOneCiRes = portOneService.getPortOneToken(req.getImpUid());

            updateMember(portOneCiRes, member);

            Ci ci = req.toEntity(portOneCiRes.getResponse().getUnique_key(), member);

            ciRepository.save(ci);
        }
    }

    private void updateMember(PortOneCiRes portOneCiRes, Member member) {
        member.updateName(portOneCiRes.getResponse().getName());
        member.updateBirth(LocalDate.parse(portOneCiRes.getResponse().getBirthday()));
        member.updateTel(portOneCiRes.getResponse().getPhone());
        member.updateIsCertificated(true);
    }
}
