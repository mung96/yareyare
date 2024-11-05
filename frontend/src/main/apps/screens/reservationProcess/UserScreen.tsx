import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MethodSelector from '@/main/ui/components/reservation/MethodSelector.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {Seat, SeatContext, UserContext} from '@/main/shared/types';
import UserInput from '@/main/ui/components/reservation/UserInput.tsx';
import {Controller, useForm} from 'react-hook-form';
import SeatContainment from '@/main/ui/components/reservation/SeatContainment.tsx';

type Props = {
  onPrev: () => void;
  onNext: (userInput: UserContext) => void;
};

function UserScreen({onPrev, onNext}: Props) {
  const [method, setMethod] = useState('모바일 티켓');
  const {control, handleSubmit} = useForm<UserContext>({
    defaultValues: {
      name: '정지연',
      birthday: '000315',
      phoneNumber: '',
      email: '',
      method: '모바일 티켓',
    },
  });

  return (
    <View style={styles.container}>
      <UserInput totalPrice={'15,000'} control={control} />
      <MethodSelector value={method} onSelect={setMethod} />
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
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

export default UserScreen;
