import {ScrollView, StyleSheet, View} from 'react-native';
import MethodSelector from '@/main/ui/components/reservation/MethodSelector.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {UserContext, UserStep} from '@/main/shared/types';
import UserInput from '@/main/ui/components/reservation/UserInput.tsx';
import {Controller, useForm} from 'react-hook-form';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import ReservationLayout from '@/main/apps/layout/ReservationLayout.tsx';
import {COLORS} from '@/main/shared/styles';
import {useGetMyInfoQuery} from '@/main/services/hooks/queries/useMemberQuery.ts';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import {useMutation} from '@tanstack/react-query';
import {patchSelectSeatCancel} from '@/main/apis/game.ts';

type Props = {
  onPrev: () => void;
  onNext: (userInput: UserContext) => void;
  context: UserStep;
};

function UserScreen({onPrev, context, onNext}: Props) {
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const {mutate: cancelSeat} = useMutation({
    mutationFn: () =>
      patchSelectSeatCancel(String(gameId), {
        idempotencyKey: context.idempotencyKey,
        seats: context.seatList.map(seat => seat.seatId),
      }),
    onSuccess: data => {
      onPrev();
      console.log(data);
    },
  });

  const {data: member, isSuccess} = useGetMyInfoQuery();
  const {
    control,
    handleSubmit,
    formState: {isValid: isFormValid, isSubmitting},
    reset,
  } = useForm<UserContext>({
    defaultValues: {
      name: member?.name,
      birthday: member?.birth,
      phoneNumber: member?.tel,
      email: member?.email,
      receiveMethod: '모바일 티켓',
    },
  });
  useEffect(() => {
    if (isSuccess && member) {
      reset({
        name: member.name,
        birthday: member.birth,
        phoneNumber: member.tel,
        email: member.email,
        receiveMethod: '모바일 티켓',
      });
    }
  }, [isSuccess, member, reset]);
  return (
    <>
      <ReservationLayout>
        <UserInput totalPrice={String(context.price)} control={control} />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {value, onChange}}) => (
            <MethodSelector value={value} onSelect={onChange} />
          )}
          name="receiveMethod"
        />
      </ReservationLayout>

      <View style={styles.buttonContainer}>
        <MainButton
          label={'이전'}
          onPress={() => cancelSeat()}
          size={'large'}
          variant={'outlined'}
          style={{width: '25%'}}
        />
        <MainButton
          label={'다음'}
          onPress={handleSubmit(onNext)}
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
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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
});

export default UserScreen;
