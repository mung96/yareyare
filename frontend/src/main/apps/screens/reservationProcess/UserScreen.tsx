import {ScrollView, StyleSheet} from 'react-native';
import MethodSelector from '@/main/ui/components/reservation/MethodSelector.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {UserContext} from 'src/main/types';
import UserInput from '@/main/ui/components/reservation/UserInput.tsx';
import {Controller, useForm} from 'react-hook-form';

type Props = {
  onPrev: () => void;
  onNext: (userInput: UserContext) => void;
};

function UserScreen({onPrev, onNext}: Props) {
  const {control, handleSubmit} = useForm<UserContext>({
    defaultValues: {
      name: '정지연',
      birthday: '000315',
      phoneNumber: '',
      email: '',
      receiveMethod: '모바일 티켓',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <UserInput totalPrice={'15,000'} control={control} />

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
