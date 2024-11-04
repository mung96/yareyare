import {Pressable, StyleSheet, View} from 'react-native';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Entypo';
import {Seat} from '@/main/apps/screens/reservationProcess';
import {includeSeatWithRowAndCol} from '@/main/services/helper/reservation/seat.ts';

const COL = Array.from({length: 20}, (_, idx) => 1 + idx);
const ROW = Array.from({length: 11}, (_, idx) => String.fromCharCode(idx + 65));
type Props = {
  value: Seat[];
  onSelect: (seat: Seat[]) => void;
};

function SeatContainment({value, onSelect}: Props) {
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
                  <Pressable
                    style={[
                      // {borderWidth: 0.3},
                      styles.seatBox,
                      (idx + 1) % 4 === 1 && {paddingLeft: 5, width: 17},
                      (idx + 1) % 4 === 0 && {paddingRight: 5, width: 17},
                    ]}
                    onPress={() => {
                      onSelect([...value, {row: row, col: col}]);
                    }}>
                    <View
                      style={[
                        styles.seat,
                        includeSeatWithRowAndCol(value, row, col) &&
                          styles.selectedSeat,
                      ]}
                    />
                  </Pressable>
                ))}
                <View style={styles.colBox}>
                  <CustomText
                    style={{fontSize: 10, lineHeight: 10, fontWeight: '900'}}>
                    {row}
                  </CustomText>
                </View>
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

  seatBox: {
    width: 12,
    height: 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat: {
    backgroundColor: COLORS.GRAY_200,
    opacity: 0.8,
    width: 8,
    height: 8,
  },
  selectedSeat: {
    backgroundColor: COLORS.BLUE,
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 10,
  },
});

export default SeatContainment;
