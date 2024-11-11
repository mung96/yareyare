import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {LOGIN_REDIRECT_URI, SERVER_BASE_URL} from '@env';
import {setEncryptStorage} from '@/main/shared/utils/encryptStorage.ts';
import {useDispatch} from 'react-redux';
import {login} from '@/main/stores/member.ts';
import axios from 'axios';

const REDIRECT_URI = LOGIN_REDIRECT_URI;

function SocialLoginScreen({route}: any) {
  const dispatch = useDispatch();
  const {social} = route.params;
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    console.log(event);
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const token = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      const response = await axios.get(
        SERVER_BASE_URL + `members/token/${token}`,
      );
      setEncryptStorage('token', response.data.body.accessToken);
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
