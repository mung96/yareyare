import {Image, StyleSheet, Text, View} from 'react-native';
import {TEAM_LIST} from '@/main/shared/constants/team.ts';
import {COLORS} from '@/main/shared/styles';

//TODO: win인 팀 글자색 바꿔야함.
function GameResultItem() {
  return (
    <View style={styles.resultItem}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={TEAM_LIST.DOOSAN.logo}
          resizeMode={'contain'}
        />
      </View>
      <Text style={styles.score}>12</Text>
      <Text style={styles.text}>vs</Text>
      <Text style={styles.score}>1</Text>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={TEAM_LIST.DOOSAN.logo}
          resizeMode={'contain'}
        />
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
    paddingHorizontal: 4,
    paddingVertical: 4,
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
});
export default GameResultItem;
