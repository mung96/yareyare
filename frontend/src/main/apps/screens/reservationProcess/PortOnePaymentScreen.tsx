import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {WEB_VIEW_SERVER} from '@env';

function PortOnePaymentScreen() {
  const message = {
    type: 'payement',
    email: 'ss@naver.com',
    phoneNumber: '010-0000-0000',
    fullName: 'aaaa',
    orderName: 'ticket',
    totalAmount: '4000',
    paymentId: '1113124567',
  };

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    console.log('message event 발생');
    console.log(event.nativeEvent);
  };

  console.log('결제진입');
  return (
    <WebView
      source={{
        uri: `${WEB_VIEW_SERVER}/payment`,
      }}
      onMessage={handleOnMessage}
      javaScriptEnabled={true}
      mixedContentMode="always"
      domStorageEnabled={true}
      // postMessage={JSON.stringify(message)}
    />
  );
}

export default PortOnePaymentScreen;
