import React from 'react';
import {Dimensions, Platform, SafeAreaView, StyleSheet} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

const REDIRECT_URI = `${
  Platform.OS === 'ios' ? 'http://localhost:3000/' : 'http://10.0.2.2:3030/'
}auth/oauth/kakao`;

function KakaoLoginScreen() {
  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log('handleOnMessage 시작');

    console.log(event.nativeEvent.url);

    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      console.log('handleOnMessage 끝');

      console.log(code);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: 'http://yareyare.co.kr:8080/members/signin/social/kakao',
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LoadingContainer: {
    height: Dimensions.get('window').height,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KakaoLoginScreen;
