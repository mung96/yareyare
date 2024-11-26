import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {Seat, SeatContext, SeatStep} from '@/main/shared/types';
import {Controller, useForm} from 'react-hook-form';
import {
  useSeatQuery,
  useSelectSeatMutation,
} from '@/main/services/hooks/queries/useSeatQuery.ts';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import SeatContainer from '@/main/ui/components/reservation/SeatContainer.tsx';
import {addSeat, removeSeat} from '@/main/services/helper/reservation/seat.ts';
import ReservationLayout from '../../layout/ReservationLayout';
import {useState} from 'react';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import SelectedSeatItem from '@/main/ui/components/reservation/SelectedSeatItem.tsx';

type Props = {
  onPrev: () => void;
  onNext: (context: SeatContext) => void;
  context: SeatStep;
};
type SeatForm = Record<string, Seat[]> & {price: number};

//TODO:이전으로 넘어갈떄 로직
//TODO: 멱등키 등록하기
//TODO: Button 레이아웃
function SeatScreen({context, onPrev, onNext}: Props) {
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const {data: seatListData} = useSeatQuery(gameId, context.grade.gradeId!);
  const setDefaultValues: () => Record<string, Seat[]> = () => {
    const defaultValues: Record<string, Seat[]> = {};
    seatListData.sections.forEach(
      section => (defaultValues[section.sectionName] = []),
    );

    return defaultValues;
  };

  const {
    control,
    handleSubmit,
    formState: {isValid: isFormValid, isSubmitting},
  } = useForm<SeatForm>({
    defaultValues: setDefaultValues(),
  });
  const [seatList, setSeatList] = useState<Seat[]>([]);
  const {mutate: selectSeat} = useSelectSeatMutation({
    onSuccess: data => {
      onNext({
        seatList: seatList,
        price: data.price,
      });
    },
  });

  const onSubmit = () => {
    const seatIdList: number[] = [];
    const seatArr: Seat[] = [];
    seatListData?.sections.forEach(section =>
      (control._formValues[section.sectionName] as Seat[]).forEach(seat => {
        seatArr.push(seat);
        seatIdList.push(seat.seatId);
      }),
    );
    setSeatList(seatArr);
    selectSeat({
      gameId: String(gameId),
      seats: seatIdList,
    });
  };
  return (
    <>
      <ReservationLayout>
        <ReservationBox>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            {seatListData?.sections.map(section => (
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <SeatContainer
                    value={value}
                    list={section.rows}
                    name={section.sectionName}
                    onAdd={(seat: Seat) => addSeat(value, seat, onChange)}
                    onRemove={(seatId: string) =>
                      removeSeat(value, seatId, onChange)
                    }
                  />
                )}
                name={section.sectionName}
              />
            ))}
          </ScrollView>
        </ReservationBox>
        <ReservationBox>
          <View style={styles.textContainer}>
            <CustomText style={styles.text}>선택한 좌석</CustomText>
          </View>
          <View style={{maxHeight: 200}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 10}}>
              {seatListData?.sections.map(section => (
                <Controller
                  control={control}
                  render={({field: {value}}) => (
                    <>
                      {value.map(seat => (
                        <SelectedSeatItem
                          key={seat.section + seat.row + ' ' + seat.col}
                          seat={seat}
                        />
                      ))}
                    </>
                  )}
                  name={section.sectionName}
                />
              ))}
            </ScrollView>
          </View>
        </ReservationBox>
      </ReservationLayout>

      <View style={styles.buttonContainer}>
        <MainButton
          label={'이전'}
          onPress={onPrev}
          size={'large'}
          variant={'outlined'}
          style={{width: '25%'}}
        />
        <MainButton
          label={'다음'}
          onPress={handleSubmit(onSubmit)}
          size={'large'}
          disabled={!isFormValid || isSubmitting}
          style={{width: '75%'}}
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
  scrollContainer: {
    backgroundColor: COLORS.GRAY_400,
    flexDirection: 'row',
    gap: 12,
  },
  buttonContainer: {
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingRight: 32,
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 0.3,
    borderColor: COLORS.GRAY_200,
  },
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

export default SeatScreen;
