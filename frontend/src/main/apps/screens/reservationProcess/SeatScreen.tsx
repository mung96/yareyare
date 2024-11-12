import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import SelectedSeatList from '@/main/ui/components/reservation/SelectedSeatList.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {Seat, SeatContext, SeatStep} from '@/main/shared/types';
import {Controller, useForm} from 'react-hook-form';
import {
  useSeatQuery,
  useSelectSeatMutation,
} from '@/main/services/hooks/queries/useSeatQuery.ts';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import SeatContainer from '@/main/ui/components/reservation/SeatContainment.tsx';
import {addSeat, removeSeat} from '@/main/services/helper/reservation/seat.ts';
import ReservationLayout from '../../layout/ReservationLayout';
import {useMutation} from '@tanstack/react-query';

type Props = {
  onPrev: () => void;
  onNext: (context: SeatContext) => void;
  context: SeatStep;
};

function SeatScreen({context, onPrev, onNext}: Props) {
  const {control, handleSubmit} = useForm<SeatContext>({
    defaultValues: {seatList: []},
  });
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const {data: seatListData} = useSeatQuery(gameId, context.grade.gradeId!);
  const {mutate: selectSeat} = useSelectSeatMutation();
  const onSubmit = () => {
    console.log(control._formValues);
    const seatIdList: number[] = [];
    control._formValues.seatList.map(seat => seatIdList.push(seat.seatId));
    console.log(seatIdList);
    selectSeat({
      gameId: String(gameId),
      seats: seatIdList,
    });

    // onNext();
  };
  return (
    <>
      <ReservationLayout>
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
                    onRemove={(seatId: string) =>
                      removeSeat(value, seatId, onChange)
                    }
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
      </ReservationLayout>
      <View style={styles.buttonContainer}>
        <MainButton
          label={'다음'}
          onPress={handleSubmit(onSubmit)}
          size={'large'}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  buttonContainer: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});

export default SeatScreen;
