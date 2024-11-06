import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {SERVER_BASE_URL, SOCIAL_LOGIN_REDIRECT_URI} from '@env';
import {setEncryptStorage} from '@/main/shared/utils/encryptStorage.ts';
import {useDispatch} from 'react-redux';
import {login} from '@/main/stores/clients/member.ts';

const REDIRECT_URI = SOCIAL_LOGIN_REDIRECT_URI;

function SocialLoginScreen({route}: any) {
  const dispatch = useDispatch();
  const {social} = route.params;
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?token=`)) {
      const token = event.nativeEvent.url.replace(`${REDIRECT_URI}?token=`, '');
      setEncryptStorage('token', token);
      dispatch(login());
    }
  };

  return (
    <WebView
      source={{
        uri: `${SERVER_BASE_URL}members/signin/social/${social}`,
      }}
      onMessage={handleOnMessage}
      injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
    />
  );
}

export default SocialLoginScreen;
