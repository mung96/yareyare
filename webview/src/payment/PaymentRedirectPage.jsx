import LoadingComponent from "../LodingComponent";

function PaymentRedirectPage() {

  window.ReactNativeWebView.postMessage('결제가 완료되었습니다')
  return <LoadingComponent/>
}

export default PaymentRedirectPage;
