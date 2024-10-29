import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';

function GameScheduleCard() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}>24.08.15(목) 17:00</Text>
        <Text style={styles.place}>고척 야구장</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.teamCard}>
          <View style={styles.imageBox}>
            {/*TODO: resizeMode 조정해야함*/}
            <Image
              style={styles.image}
              source={require('@/main/assets/Doosan.png')}
              resizeMode={'contain'}
            />
          </View>
          <Text style={styles.teamName}>두산</Text>
        </View>
        <Text>VS</Text>
        <View style={styles.teamCard}>
          <View style={styles.imageBox}>
            <Image
              style={styles.image}
              source={require('@/main/assets/Kiwoom.png')}
              resizeMode={'cover'}
            />
          </View>
          <Text style={styles.teamName}>키움</Text>
        </View>
      </View>
      <Button title={'예매하기'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 22,
    minWidth: 200,
    backgroundColor: COLORS.GRAY_400,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  date: {
    fontSize: 14,
    color: COLORS.BLACK,
  },
  place: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  image: {
    width: '100%',
  },
  imageBox: {
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  stageName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default GameScheduleCard;
