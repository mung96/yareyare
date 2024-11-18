import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import GameResultItem from '@/main/ui/components/game/GameResultItem.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {useGetGameResultQuery} from '@/main/services/hooks/queries/useGameQuery.ts';

function GameResultCard() {
  const {data: gameResultList} = useGetGameResultQuery();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText style={[styles.date, styles.text]}>
          {gameResultList?.gameDate}
        </CustomText>
        <CustomText style={styles.text}>경기 결과</CustomText>
      </View>
      <View style={styles.resultList}>
        {gameResultList?.results.map(result => (
          <GameResultItem
            game={{
              homeTeam: {name: '', logo: result.homeTeamLogo, stadium: ''},
              awayTeam: {name: '', logo: result.awayTeamLogo, stadium: ''},
              result: {
                homeScore: result.homeTeamScore, //TODO: null일떄 처리
                awayScore: result.awayTeamScore,
              },
              status: result.gameStatus,
            }}
            key={result.homeTeamLogo}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 32,

    backgroundColor: COLORS.GRAY_400,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 300,

    flexWrap: 'wrap',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  date: {
    fontWeight: '700',
  },
  resultList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
});

export default GameResultCard;
