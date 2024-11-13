import {requestPayment} from "@portone/browser-sdk/v2";

const PORTONE_STORE_ID = process.env.REACT_APP_PORTONE_STORE_ID
const PORTONE_CHANNEL_KEY = process.env.REACT_APP_PORTONE_CHANNEL_KEY
const FRONT_SERVER = process.env.REACT_APP_FRONT_SERVER

export async function fetchPortOne(data) {
  await requestPayment({
    // Store ID 설정
    storeId: PORTONE_STORE_ID,
    // 채널 키 설정
    channelKey: PORTONE_CHANNEL_KEY,
    customer: {
      email: data?.email,
      phoneNumber:  data?.phoneNumber,
      fullName:data?.fullName ,
    },
    paymentId: `payment-${219473812}`,
    orderName: data.orderName,
    totalAmount: data.totalAmount,
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
    redirectUrl: `${FRONT_SERVER}/paymentRedirect`
  });

}


