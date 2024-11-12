import WebView from 'react-native-webview';
import {WEB_VIEW_SERVER} from '@env';

function CertificateStartScreen() {
  function onMessage(e) {
    /* 리액트로부터 post message를 받았을때 트리거 된다 */
    try {
      /* post message에서 가맹점 식별코드, 본인인증 데이터 그리고 액션 유형을 추출한다 */
      const {userCode, data, type} = JSON.parse(e.nativeEvent.data);
      const params = {userCode, data};
      /* 본인인증 화면으로 이동한다 */
      console.log(params);
      // navigation.push(type === 'payment' ? 'Payment' : 'Certification', params);
    } catch (e) {}
  }

  return (
    <WebView
      source={{uri: WEB_VIEW_SERVER + '/certificate'}}
      onMessage={onMessage}
      style={{flex: 1}}
      injectedJavascript={`(function() {
        window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data);
        };
      })()`}
    />
  );
}
export default CertificateStartScreen;
