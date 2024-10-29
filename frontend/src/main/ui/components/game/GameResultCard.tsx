import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import GameResultItem from '@/main/ui/components/game/GameResultItem.tsx';

function GameResultCard() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.date, styles.text]}>2024.08.14</Text>
        <Text style={styles.text}>경기 결과</Text>
      </View>
      <View style={styles.resultList}>
        <GameResultItem />
        <GameResultItem />
        <GameResultItem />
        <GameResultItem />
        <GameResultItem />
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
