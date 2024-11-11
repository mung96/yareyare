import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import SelectedSeatList from '@/main/ui/components/reservation/SelectedSeatList.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {Seat, SeatContext, SeatStep} from '@/main/shared/types';
import {Controller, useForm} from 'react-hook-form';
import {useSeatQuery} from '@/main/services/hooks/queries/useSeatQuery.ts';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import SeatContainer from '@/main/ui/components/reservation/SeatContainment.tsx';

type Props = {
  onPrev: () => void;
  onNext: (context: SeatContext) => void;
  context: SeatStep;
};

function SeatScreen({context, onPrev, onNext}: Props) {
  const {control, handleSubmit} = useForm<SeatContext>({
    defaultValues: {seatList: []},
  });

  function addSeat(arr: Seat[], seat: Seat, onChange: (value: Seat[]) => void) {
    const newSeatList = [...arr, seat];
    onChange(newSeatList);
  }
  const gameId = useSelector((state: RootState) => state.game.gameId);
  console.log('gameId: ' + gameId);
  console.log('gradeId: ' + context.grade.gradeId);
  const {data: seatListData} = useSeatQuery(gameId, context.grade.gradeId!);

  console.log('좌석조회');
  console.dir(seatListData);
  console.log('좌석조회');

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
          <SeatContainer
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
