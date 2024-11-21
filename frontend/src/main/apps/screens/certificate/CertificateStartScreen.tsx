import WebView from 'react-native-webview';
import {WEB_VIEW_SERVER} from '@env';
import {PATH} from '@/main/shared/constants';
import {WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CertificateParamList} from '@/main/apps/navigations/CertificateNavigation.tsx';

type CertificateStartScreenProps = NativeStackScreenProps<
  CertificateParamList,
  'CertificateStart'
>;

function CertificateStartScreen({navigation}: CertificateStartScreenProps) {
  function onMessage(e: WebViewMessageEvent) {
    try {
      const {userCode, data} = JSON.parse(e.nativeEvent.data);
      const params = {userCode, data};
      navigation.navigate(PATH.CERTIFICATE, params);
    } catch (error) {
      console.log(error);
    }
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
