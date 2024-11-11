import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import {COLORS} from '@/main/shared/styles';
import TimerBar from '@/main/ui/components/game/TimerBar.tsx';
import {useGetGameDetailQuery} from '@/main/services/hooks/queries/useGameQuery.ts';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';

//TODO: 경기 상제조회부터
function WaitingScreen() {
  const dispatch = useDispatch();
  const gameId = useSelector((state: RootState) => state.reservation.gameId);
  const {data: gameDetailData} = useGetGameDetailQuery(gameId);
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <CustomText style={{fontSize: 20, fontWeight: '900'}}>
          접속 인원이 많아 대기중입니다.
        </CustomText>
        <CustomText style={{fontSize: 14}}>
          {gameDetailData?.seasonName +
            ' ' +
            gameDetailData?.homeTeamName +
            ' vs ' +
            gameDetailData?.awayTeamName}
        </CustomText>
      </View>
      <View style={styles.waitBox}>
        <CustomText style={styles.title}>나의 대기순서</CustomText>
        <CustomText style={styles.peopleText}>1240</CustomText>
        <CustomText style={styles.text}>
          뒤에 <CustomText style={styles.pointText}>324</CustomText>명 / 1시간
          3분 43초 소요 예상
        </CustomText>
        <TimerBar />
      </View>
      <View style={styles.descriptionBox}>
        <CustomText style={styles.description}>
          잠시만 기다려주시면, 예매하기 페이지로 연결됩니다.
        </CustomText>
        <CustomText style={styles.description}>
          새로고침 하거나 재접속 하시면 대기순서가
          <CustomText style={styles.pointText}> 초기화</CustomText>
          되어 대기시간이 더 길어집니다.
        </CustomText>
      </View>
      <Pressable onPress={() => dispatch(moveNavigation('reservation'))}>
        <CustomText>예매하러가기</CustomText>
      </Pressable>
    </View>
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
    fontSize: 18,
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
