import {ScrollView, StyleSheet} from 'react-native';
import MethodSelector from '@/main/ui/components/reservation/MethodSelector.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {UserContext, UserStep} from '@/main/shared/types';
import UserInput from '@/main/ui/components/reservation/UserInput.tsx';
import {Controller, useForm} from 'react-hook-form';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';

type Props = {
  onPrev: () => void;
  onNext: (userInput: UserContext) => void;
  context: UserStep;
};

function UserScreen({onPrev, context, onNext}: Props) {
  const {member} = useMemberModel();
  const {control, handleSubmit} = useForm<UserContext>({
    defaultValues: {
      name: member?.name!,
      birthday: member?.birth!,
      phoneNumber: member?.tel!,
      email: member?.email!,
      receiveMethod: '모바일 티켓',
    },
  });
  return (
    <ScrollView style={styles.container}>
      <UserInput totalPrice={String(context.price)} control={control} />

      <Controller
        control={control}
        render={({field: {value, onChange}}) => (
          <MethodSelector value={value} onSelect={onChange} />
        )}
        name="receiveMethod"
      />

      <MainButton
        label={'다음'}
        onPress={handleSubmit(onNext)}
        size={'large'}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

export default UserScreen;
