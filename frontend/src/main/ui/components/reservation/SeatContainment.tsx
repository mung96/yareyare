import {Pressable, StyleSheet, View} from 'react-native';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Entypo';
import {Seat} from '@/main/shared/types';
import {includeSeat} from '@/main/services/helper/reservation/seat.ts';

type Props = {
  name: string;
  value: Seat[];
  list: {
    rowName: string;
    seats: {isAvailable: boolean; seatId: string; seatNumber: number}[];
  }[];
  onAdd: (seat: Seat) => void;
  onRemove: (seatId: string) => void;
};

export type SeatList = {
  [key: number]: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
};

function SeatContainer({name, value, onAdd, onRemove, list}: Props) {
  return (
    <ReservationBox>
      <View>
        <View style={styles.groundBox}>
          <Icon name={'arrow-up'} size={50} color={COLORS.GRAY_400} />
          <CustomText style={styles.groundText}>GROUND</CustomText>
          <Icon name={'arrow-up'} size={50} color={COLORS.GRAY_400} />
        </View>
        <View style={styles.seatContainer}>
          <CustomText style={styles.seatNumber}>{name}</CustomText>
          <View style={styles.column}>
            {list.map(row => {
              return (
                <View style={styles.row} key={row.rowName + ' ' + name}>
                  {row.seats.map(seat => {
                    const disabled = !seat.isAvailable;
                    return (
                      <Pressable
                        disabled={disabled}
                        key={seat.seatId}
                        style={[
                          styles.seatBox,
                          seat.seatNumber % 4 === 1 && {
                            paddingLeft: 5,
                            width: 17,
                          },
                          seat.seatNumber % 4 === 0 && {
                            paddingRight: 5,
                            width: 17,
                          },
                        ]}
                        onPress={() => {
                          includeSeat(value, seat.seatId)
                            ? onRemove(String(seat.seatId))
                            : onAdd({
                                seatId: seat.seatId,
                                section: name,
                                row: row.rowName,
                                col: String(seat.seatNumber),
                              });
                        }}>
                        <View
                          style={[
                            styles.seat,
                            disabled && styles.disabledSeat,
                            includeSeat(value, seat.seatId) &&
                              styles.selectedSeat,
                          ]}
                        />
                      </Pressable>
                    );
                  })}
                  <View style={styles.colBox}>
                    <CustomText
                      style={{
                        fontSize: 10,
                        lineHeight: 10,
                        fontWeight: '900',
                      }}>
                      {row.rowName}
                    </CustomText>
                  </View>
                </View>
              );
            })}
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
    backgroundColor: COLORS.BLUE,
    opacity: 0.8,
    width: 8,
    height: 8,
  },
  disabledSeat: {
    backgroundColor: COLORS.GRAY_200,
  },
  selectedSeat: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 4,
    borderWidth: 2,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 10,
  },
});

export default SeatContainer;
