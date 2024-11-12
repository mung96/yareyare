import React from 'react';
const IMP = process.env.REACT_APP_IMP
function Certification() {
  function onClickCertification() {
    const userCode = IMP;

    /* 2. 본인인증 데이터 정의하기 */
    const data = {
      merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
      company: '아임포트',                           // 회사명 또는 URL
      carrier: 'SKT1',                              // 통신사
      name: '홍길동',                                // 이름
      phone: '01012341234',                        // 전화번호
    };
      /* 5. 리액트 네이티브 환경에 대응하기 */
      const params = {
        userCode,                                   // 가맹점 식별코드
        data,                                       // 본인인증 데이터
        type: 'certification',                      // 결제와 본인인증 구분을 위한 필드
      };
      const paramsToString = JSON.stringify(params);
      window.ReactNativeWebView.postMessage(paramsToString);
  }

  return <button onClick={onClickCertification}>본인인증 하기</button>
}
export default Certification;
