import {StyleSheet} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {WEB_VIEW_SERVER} from '@env';
import {useRef} from 'react';
import useGameDetailModel from '@/main/services/hooks/useGameDetailQuery.ts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import {useGetMyInfoQuery} from '@/main/services/hooks/queries/useMemberQuery.ts';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';

function WaitingScreen() {
  const dispatch = useDispatch();
  const {gameDetail, gameId} = useGameDetailModel();
  const {data: member} = useGetMyInfoQuery();

  const token = useSelector((state: RootState) => state.member.token);
  const message = {
    gameId: gameId,
    gameName: gameDetail.name,
    memberId: member?.uuid,
    accessToken: token,
  };
  const webViewRef = useRef<WebView>(null);

  const onLoad = async () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({...message}));
    }
  };
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === '대기열 탈출') {
      dispatch(moveNavigation('reservation'));
    }
  };

  return (
    <WebView
      source={{
        uri: `${WEB_VIEW_SERVER}/wait`,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 24,
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
  titleBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 4,
  },
  waitBox: {
    backgroundColor: COLORS.GRAY_400,
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
  },
  pointText: {
    color: COLORS.PURPLE_100,
    fontWeight: '900',
  },
  title: {
    fontSize: 32,
    color: COLORS.BLACK,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 4,
  },

  description: {fontSize: 13, fontWeight: '500'},
  peopleText: {
    fontSize: 60,
    lineHeight: 60,
    fontWeight: '900',
  },
});

export default WaitingScreen;
