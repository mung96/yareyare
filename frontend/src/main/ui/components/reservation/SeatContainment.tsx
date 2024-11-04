import {StyleSheet, View} from 'react-native';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Entypo';

const COL = Array.from({length: 20}, (_, idx) => 1 + idx);
const ROW = Array.from({length: 11}, (_, idx) => String.fromCharCode(idx + 65));

function SeatContainment() {
  return (
    <ReservationBox>
      <View>
        <View style={styles.groundBox}>
          <Icon name={'arrow-up'} size={50} color={COLORS.GRAY_400} />
          <CustomText style={styles.groundText}>GROUND</CustomText>
          <Icon name={'arrow-up'} size={50} color={COLORS.GRAY_400} />
        </View>
        <View style={styles.seatContainer}>
          <CustomText style={styles.seatNumber}>101</CustomText>
          <View style={styles.row}>
            {ROW.map(row => (
              <View style={styles.column}>
                {COL.map((col, idx) => (
                  <View
                    style={[
                      styles.seat,
                      (idx + 1) % 4 === 0 && {marginRight: 10},
                    ]}
                  />
                ))}
                <CustomText
                  style={{fontSize: 10, lineHeight: 10, fontWeight: '900'}}>
                  {row}
                </CustomText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ReservationBox>
  );
}

const styles = StyleSheet.create({
  groundBox: {
    backgroundColor: COLORS.GREEN_200,
    opacity: 0.8,
    paddingVertical: 32,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    gap: 30,
  },
  groundText: {
    color: COLORS.GRAY_100,
    fontSize: 28,
    fontWeight: '900',
  },
  seatContainer: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  seatNumber: {
    fontSize: 22,
    fontWeight: '900',
  },
  seat: {
    backgroundColor: COLORS.GRAY_200,
    opacity: 0.8,
    width: 8,
    height: 8,
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export default SeatContainment;
