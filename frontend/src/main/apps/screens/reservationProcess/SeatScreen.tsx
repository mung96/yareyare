import {StyleSheet, View} from 'react-native';
import SeatContainment from '@/main/ui/components/reservation/SeatContainment.tsx';
import {COLORS} from 'src/main/styles';
import SelectedSeatList from '@/main/ui/components/reservation/SelectedSeatList.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {Seat, SeatContext} from 'src/main/types';
import {Controller, useForm} from 'react-hook-form';

type Props = {
  onPrev: () => void;
  onNext: (context: SeatContext) => void;
};

function SeatScreen({onPrev, onNext}: Props) {
  const {control, handleSubmit} = useForm<SeatContext>({
    defaultValues: {seatList: []},
  });

  function addSeat(arr: Seat[], seat: Seat, onChange: (value: Seat[]) => void) {
    const newSeatList = [...arr, seat];
    onChange(newSeatList);
  }

  function removeSeat(
    arr: Seat[],
    seat: Seat,
    onChange: (value: Seat[]) => void,
  ) {
    const newSeatList = arr.filter(
      item => !(item.row === seat.row && item.col === seat.col),
    );
    onChange(newSeatList);
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <SeatContainment
            value={value}
            onAdd={(seat: Seat) => addSeat(value, seat, onChange)}
            onRemove={(seat: Seat) => removeSeat(value, seat, onChange)}
          />
        )}
        name="seatList"
      />

      <Controller
        control={control}
        render={({field: {value}}) => <SelectedSeatList seatList={value} />}
        name="seatList"
      />

      <MainButton
        label={'다음'}
        onPress={handleSubmit(onNext)}
        size={'large'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
});

export default SeatScreen;
