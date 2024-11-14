
function PaymentRedirectPage() {

  window.ReactNativeWebView.postMessage('결제가 완료되었습니다')
  return (
      <div>
        <p>리다이렉트 중입니다.</p>
      </div>
  );
}

export default PaymentRedirectPage;
