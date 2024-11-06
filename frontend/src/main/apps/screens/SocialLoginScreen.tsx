import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {SERVER_BASE_URL, SOCIAL_LOGIN_REDIRECT_URI} from '@env';
import {setEncryptStorage} from '@/main/shared/utils/encryptStorage.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomParamList} from '@/main/apps/navigations/BottomNavBar.tsx';
import {useDispatch} from 'react-redux';
import {login} from '@/main/stores/clients/member.ts';
import {PATH} from '@/main/shared/constants';

const REDIRECT_URI = SOCIAL_LOGIN_REDIRECT_URI;

function KakaoLoginScreen() {
  const navigation = useNavigation<NavigationProp<BottomParamList>>();
  const dispatch = useDispatch();
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?token=`)) {
      const token = event.nativeEvent.url.replace(`${REDIRECT_URI}?token=`, '');
      setEncryptStorage('token', token);

      dispatch(login());
      navigation.navigate(PATH.HOME);
    }
  };

  return (
    <WebView
      source={{
        uri: `${SERVER_BASE_URL}members/signin/social/kakao`,
      }}
      onMessage={handleOnMessage}
      injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
    />
  );
}

export default KakaoLoginScreen;
