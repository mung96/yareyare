import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {Team} from '@/main/shared/types';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {SvgUri} from 'react-native-svg';

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
        <CustomText style={styles.date}>{dateTime}</CustomText>
        <CustomText style={styles.place}>{homeTeam.stadium}</CustomText>
      </View>
      <View style={styles.body}>
        <View style={styles.teamCard}>
          <View style={styles.imageBox}>
            <SvgUri uri={homeTeam.logo} width={72} height={72} />
          </View>
          <CustomText style={styles.teamName}>{homeTeam.name}</CustomText>
        </View>
        <CustomText style={{fontSize: 20}}>VS</CustomText>
        <View style={styles.teamCard}>
          <View style={styles.imageBox}>
            <SvgUri
              uri={awayTeam.logo}
              style={styles.image}
              width={72}
              height={72}
            />
          </View>
          <CustomText style={styles.teamName}>{awayTeam.name}</CustomText>
        </View>
      </View>
      <MainButton
        label={'예매하기'}
        onPress={onPress}
        variant={'filledSub'}
        size="large"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 22,
    width: 270,
    height: 320,
    backgroundColor: COLORS.GRAY_400,
    paddingVertical: 24,
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
    fontSize: 20,
    color: COLORS.BLACK,
  },
  place: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  image: {
    width: '100%',
  },
  imageBox: {
    width: 52,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  stageName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default GameScheduleCard;
