import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {WEB_VIEW_SERVER} from '@env';
import {useRef} from 'react';

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
  const webViewRef = useRef<WebView>(null);
  const onLoad = async () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({price: 1000}));
    }
  };
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent);
  };

  return (
    <WebView
      source={{
        uri: `${WEB_VIEW_SERVER}/payment`,
      }}
      onMessage={handleOnMessage}
      javaScriptEnabled={true}
      mixedContentMode="always"
      domStorageEnabled={true}
      ref={webViewRef}
      onLoad={onLoad}
    />
  );
}

export default PortOnePaymentScreen;
