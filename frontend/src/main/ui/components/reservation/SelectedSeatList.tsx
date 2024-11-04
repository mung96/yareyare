import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';

function SelectedSeatList() {
  return (
    <ReservationBox>
      <View style={styles.textContainer}>
        <CustomText style={styles.text}>선택한 좌석</CustomText>
        <View style={styles.seatCnt}>
          <Text style={styles.seatCntText}>2</Text>
        </View>
      </View>
    </ReservationBox>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  text: {
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
  },
  seatCnt: {
    borderRadius: 100,
    width: 20,
    height: 20,
    backgroundColor: COLORS.PURPLE_100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatCntText: {
    color: COLORS.WHITE,
    fontWeight: '500',
  },
});

export default SelectedSeatList;
