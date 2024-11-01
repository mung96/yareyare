import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import PaymentMethodList from '@/main/ui/components/reservation/PaymentMethodList';
import ExpectedPayment from '@/main/ui/components/reservation/ExpectedPayment.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';

type Props = {
  onPrev: () => void;
  onSubmit: () => void;
};

function PaymentScreen({onPrev, onSubmit}: Props) {
  const [method, setMethod] = useState('');
  return (
    <View style={styles.container}>
      <PaymentMethodList select={method} onSelect={setMethod} />

      <ExpectedPayment />

      <MainButton label={'결제 및 완료'} onPress={onSubmit} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
export default PaymentScreen;
