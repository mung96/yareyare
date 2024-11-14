import {ScrollView, StyleSheet, View} from 'react-native';
import MethodSelector from '@/main/ui/components/reservation/MethodSelector.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {UserContext, UserStep} from '@/main/shared/types';
import UserInput from '@/main/ui/components/reservation/UserInput.tsx';
import {Controller, useForm} from 'react-hook-form';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import ReservationLayout from '@/main/apps/layout/ReservationLayout.tsx';
import {COLORS} from '@/main/shared/styles';

type Props = {
  onPrev: () => void;
  onNext: (userInput: UserContext) => void;
  context: UserStep;
};

function UserScreen({onPrev, context, onNext}: Props) {
  const {member} = useMemberModel();
  const {
    control,
    handleSubmit,
    formState: {isValid: isFormValid, isSubmitting},
  } = useForm<UserContext>({
    defaultValues: {
      name: member?.name!,
      birthday: member?.birth!,
      phoneNumber: member?.tel!,
      email: member?.email!,
      receiveMethod: '모바일 티켓',
    },
  });
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
          label={'다음'}
          onPress={handleSubmit(onNext)}
          size={'large'}
          disabled={!isFormValid || isSubmitting}
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
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderTopWidth: 0.3,
    borderColor: COLORS.GRAY_200,
  },
});

export default UserScreen;
