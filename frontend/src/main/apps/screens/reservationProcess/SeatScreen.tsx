import {ScrollView, StyleSheet, View} from 'react-native';
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
  const {data: seatListData} = useSeatQuery(gameId, context.grade.gradeId!);

  console.log('좌석조회');
  console.log(seatListData?.sections);
  console.log('좌석조회');

  function removeSeat(
    arr: Seat[],
    seat: Seat,
    onChange: (value: Seat[]) => void,
  ) {
    const newSeatList = arr.filter(item => !(item.seatId === seat.seatId));
    onChange(newSeatList);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <>
              {seatListData?.sections.map(section => (
                <SeatContainer
                  value={value}
                  list={section.rows}
                  name={section.sectionName}
                  onAdd={(seat: Seat) => addSeat(value, seat, onChange)}
                  onRemove={(seat: Seat) => removeSeat(value, seat, onChange)}
                />
              ))}
            </>
          )}
          name="seatList"
        />
      </ScrollView>

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
