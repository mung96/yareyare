import {requestPayment} from "@portone/browser-sdk/v2";

const PORTONE_STORE_ID = process.env.REACT_APP_PORTONE_STORE_ID
const PORTONE_CHANNEL_KEY = process.env.REACT_APP_PORTONE_CHANNEL_KEY
const FRONT_SERVER = process.env.REACT_APP_FRONT_SERVER

export async function fetchPortOne() {
  window?.ReactNativeWebView?.postMessage("웹뷰 결제 진입")

  const response = await requestPayment({
    // Store ID 설정
    storeId: PORTONE_STORE_ID,
    // 채널 키 설정
    channelKey: PORTONE_CHANNEL_KEY,
    customer: {
      email: 'ss@naver.com',
      phoneNumber: '010-0000-0000',
      fullName: 'aaaa',
    },
    paymentId: `payment-${219473812}`,
    orderName: 'ticket',
    totalAmount: '4000',
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
    redirectUrl: `${FRONT_SERVER}/paymentRedirect`
  });

}


