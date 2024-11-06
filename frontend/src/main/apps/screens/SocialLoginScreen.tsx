import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {SERVER_BASE_URL, SOCIAL_LOGIN_REDIRECT_URI} from '@env';

const REDIRECT_URI = SOCIAL_LOGIN_REDIRECT_URI;

//
// type A = {name: string; age: number};
// type B = {name: string; tall: number};
//
// const a: A = {name: 'a'};
// const a: A = {name: 'a', age: 11, tall: 11};

function KakaoLoginScreen() {
  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?token=`)) {
      const token = event.nativeEvent.url.replace(`${REDIRECT_URI}?token=`, '');
      console.log(token);
    }
  };

  return (
    <WebView
      source={{
        uri: `${SERVER_BASE_URL}members/signin/social/kakao`,
      }}
      onMessage={handleOnMessage}
      injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
      onError={error => console.error(error)}
    />
  );
}

export default KakaoLoginScreen;
