import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {Team} from '@/main/shared/types';

type Props = {
  dateTime: string;
  homeTeam: Team;
  awayTeam: Team;
  onPress: () => void;
};

function GameScheduleCard({dateTime, homeTeam, awayTeam, onPress}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}>{dateTime}</Text>
        <Text style={styles.place}>{homeTeam.stadium}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.teamCard}>
          <View style={styles.imageBox}>
            {/*TODO: resizeMode 조정해야함*/}
            <Image
              style={styles.image}
              source={homeTeam.logo}
              resizeMode={'contain'}
            />
          </View>
          <Text style={styles.teamName}>{homeTeam.name}</Text>
        </View>
        <Text>VS</Text>
        <View style={styles.teamCard}>
          <View style={styles.imageBox}>
            <Image
              style={styles.image}
              source={awayTeam.logo}
              resizeMode={'contain'}
            />
          </View>
          <Text style={styles.teamName}>{awayTeam.name}</Text>
        </View>
      </View>
      <MainButton label={'예매하기'} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 22,
    width: 180,

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
