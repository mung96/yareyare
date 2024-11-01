import {Button, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/main/shared/styles';
import PaymentMethodList from '@/main/ui/components/reservation/PaymentMethodList';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';

type Props = {
  onPrev: () => void;
  onSubmit: () => void;
};

function PaymentScreen({onPrev, onSubmit}: Props) {
  const [method, setMethod] = useState('');
  return (
    <View>
      <ReservationBox title={'결제 방법 입력'}>
        <PaymentMethodList select={method} onSelect={setMethod} />
      </ReservationBox>

      <Button title={'다음'} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 14,
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingHorizontal: 12,
  },
  inputContainerTitle: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '900',
  },
});
export default PaymentScreen;
