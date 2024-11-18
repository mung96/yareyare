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
    console.log(event.nativeEvent);
    console.log(event.nativeEvent.data === '대기열 탈출');
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
    // <View style={styles.container}>
    //   <View style={styles.titleBox}>
    //     <CustomText style={{fontSize: 20, fontWeight: '900'}}>
    //       접속 인원이 많아 대기중입니다.
    //     </CustomText>
    //     <CustomText style={{fontSize: 14}}>{gameDetail.name}</CustomText>
    //   </View>
    //   <View style={styles.waitBox}>
    //     <CustomText style={styles.title}>나의 대기순서</CustomText>
    //     <CustomText style={styles.peopleText}>1240</CustomText>
    //     <CustomText style={styles.text}>
    //       뒤에 <CustomText style={styles.pointText}>324</CustomText>명 / 1시간
    //       3분 43초 소요 예상
    //     </CustomText>
    //     <TimerBar />
    //   </View>
    //   <View style={styles.descriptionBox}>
    //     <CustomText style={styles.description}>
    //       잠시만 기다려주시면, 예매하기 페이지로 연결됩니다.
    //     </CustomText>
    //     <CustomText style={styles.description}>
    //       새로고침 하거나 재접속 하시면 대기순서가
    //       <CustomText style={styles.pointText}> 초기화</CustomText>
    //       되어 대기시간이 더 길어집니다.
    //     </CustomText>
    //   </View>
    //   <Pressable onPress={() => dispatch(moveNavigation('reservation'))}>
    //     <CustomText>예매하러가기</CustomText>
    //   </Pressable>
    // </View>
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
