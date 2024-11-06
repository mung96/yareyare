import {StyleSheet, View} from 'react-native';
import {COLORS} from 'src/main/styles';
import GameResultItem from '@/main/ui/components/game/GameResultItem.tsx';
import {Game} from '@/main/types/game.ts';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

const gameList: Game[] = [
  {homeTeam: 'DOOSAN', awayTeam: 'NC', result: {homeScore: 1, awayScore: 12}},
  {homeTeam: 'KT', awayTeam: 'KIA', result: {homeScore: 13, awayScore: 12}},
  {homeTeam: 'SSG', awayTeam: 'KIWOOM', result: {homeScore: 1, awayScore: 2}},
  {homeTeam: 'SAMSUNG', awayTeam: 'LG', result: {homeScore: 3, awayScore: 2}},
  {
    homeTeam: 'LOTTE',
    awayTeam: 'HANHWA',
    result: {homeScore: 13, awayScore: 12},
  },
];

function GameResultCard() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText style={[styles.date, styles.text]}>2024.08.14</CustomText>
        <CustomText style={styles.text}>경기 결과</CustomText>
      </View>
      <View style={styles.resultList}>
        {gameList.map(game => (
          <GameResultItem game={game} key={game.homeTeam} />
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
    justifyContent: 'center',
    gap: 22,

    backgroundColor: COLORS.GRAY_400,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 8,

    flexWrap: 'wrap',
    width: '100%',
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
    alignItems: 'center',
    justifyContent: 'flex-start',

    flexWrap: 'wrap',
    gap: 4,
  },
});

export default GameResultCard;
