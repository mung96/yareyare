import {StyleSheet, View} from 'react-native';
import React from 'react';
import MethodSelector from '@/main/ui/components/reservation/MethodSelector.tsx';
import UserInput from '@/main/ui/components/reservation/UserInput.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

function UserScreen({onPrev, onNext}: Props) {
  return (
    <View style={styles.container}>
      <UserInput />
      <MethodSelector />
      <MainButton label={'다음'} onPress={onNext} size={'large'} />
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
