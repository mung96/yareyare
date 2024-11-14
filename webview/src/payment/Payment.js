import {requestPayment} from "@portone/browser-sdk/v2";

const PORTONE_STORE_ID = process.env.REACT_APP_PORTONE_STORE_ID
const PORTONE_CHANNEL_KEY = process.env.REACT_APP_PORTONE_CHANNEL_KEY
const FRONT_SERVER = process.env.REACT_APP_FRONT_SERVER

export async function fetchPortOne(data) {
  try{
    const response = await requestPayment({
      // Store ID 설정
      storeId: PORTONE_STORE_ID,
      // 채널 키 설정
      channelKey: PORTONE_CHANNEL_KEY,
      customer: {
        email: data?.email,
        phoneNumber:  data?.phoneNumber,
        fullName:data?.fullName ,
      },
      paymentId: `paymentId-${data.paymentId}`,
      orderName: data.orderName,
      totalAmount: data.totalAmount,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      redirectUrl: `${FRONT_SERVER}/paymentRedirect`
    });
    // const response = await requestPayment({
    //   // Store ID 설정
    //   storeId: PORTONE_STORE_ID,
    //   // 채널 키 설정
    //   channelKey: PORTONE_CHANNEL_KEY,
    //   customer: {
    //     email: 'www@naver.com',
    //     phoneNumber:  '010-1234-5678',
    //     fullName:'111' ,
    //   },
    //   paymentId: `paymentId-${193734}`,
    //   orderName: '12345',
    //   totalAmount: 1200,
    //   currency: "CURRENCY_KRW",
    //   payMethod: "CARD",
    //   redirectUrl: `${FRONT_SERVER}/paymentRedirect`
    // });
    // alert(response)
    // console.log(response)
    //
    // window.ReactNativeWebView.postMessage(response)
  }catch (error){
    alert(error)
    window.ReactNativeWebView.postMessage('결제실패')
    window.ReactNativeWebView.postMessage({...error.data})
  }finally {
    window.ReactNativeWebView.postMessage("결제종료")
  }
}


