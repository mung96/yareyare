import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {WEB_VIEW_SERVER} from '@env';

function PortOnePaymentScreen() {
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    console.log('message event 발생');
    console.log(event);
  };

  return (
    <WebView
      source={{
        uri: `${WEB_VIEW_SERVER}`,
      }}
      onMessage={handleOnMessage}
      injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
    />
  );
}

export default PortOnePaymentScreen;
