import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {Game} from '@/main/shared/types';
import {SvgUri} from 'react-native-svg';

type Props = {
  game: Game;
};

//TODO: win인 팀 글자색 바꿔야함.
function GameResultItem({game}: Props) {
  return (
    <View style={styles.resultItem}>
      <View style={styles.imageBox}>
        <SvgUri uri={game.homeTeam.logo} width={48} height={48} />
      </View>
      {game.status === 'OFF' ? (
        //TODO:union type으로 status지정해야함.
        //TODO: css 안맞음
        <CustomText>경기취소</CustomText>
      ) : (
        <>
          <CustomText
            style={[
              styles.score,
              game.result.homeScore > game.result.awayScore && styles.winScore,
            ]}>
            {game.result.homeScore}
          </CustomText>
          <CustomText style={styles.text}>vs</CustomText>
          <CustomText
            style={[
              styles.score,
              game.result.homeScore < game.result.awayScore && styles.winScore,
            ]}>
            {game.result.awayScore}
          </CustomText>
        </>
      )}

      <View style={styles.imageBox}>
        <SvgUri uri={game.awayTeam.logo} width={48} height={48} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GRAY_700,
    borderRadius: 5,
    gap: 6,
    width: '48%',
    minWidth: '48%',
    maxWidth: '46%',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  imageBox: {
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 10,
  },
  score: {
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.BLACK,
  },
  winScore: {
    color: COLORS.PURPLE_100,
  },
});
export default GameResultItem;
