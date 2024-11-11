import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import BaseBallSvg from '@/main/assets/baseball.svg';
import GloveSvg from '@/main/assets/glove.svg';
function TimerBar() {
  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <BaseBallSvg width={16} height={16} />
      </View>
      <GloveSvg width={16} height={16} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 40,
    backgroundColor: COLORS.WHITE,
    height: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  timer: {
    width: '80%',
    maxWidth: '90%',
    minWidth: '20%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: COLORS.PURPLE_100,
    borderRadius: 40,
  },
});

export default TimerBar;
