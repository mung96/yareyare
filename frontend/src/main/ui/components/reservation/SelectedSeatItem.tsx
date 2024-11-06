import {StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {Seat} from '@/main/apps/screens/reservationProcess';
import {COLORS} from '@/main/shared/styles';

type Props = {
  seat: Seat;
};

function SelectedSeatItem({seat}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <CustomText style={styles.text}>
        {seat.section}구역 {seat.row}열 {seat.col}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',

    borderBottomWidth: 0.4,
    borderColor: COLORS.GRAY_200,

    paddingVertical: 4,
  },
  box: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.BLUE,
    marginTop: 4,
  },
  text: {
    fontSize: 14,
  },
});

export default SelectedSeatItem;
