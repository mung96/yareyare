import {Button, View} from 'react-native';
import React, {useState} from 'react';
import PaymentMethodList from '@/main/ui/components/reservation/PaymentMethodList';
import ExpectedPayment from '@/main/ui/components/reservation/ExpectedPayment.tsx';

type Props = {
  onPrev: () => void;
  onSubmit: () => void;
};

function PaymentScreen({onPrev, onSubmit}: Props) {
  const [method, setMethod] = useState('');
  return (
    <View>
      <PaymentMethodList select={method} onSelect={setMethod} />

      <ExpectedPayment />

      <Button title={'다음'} onPress={onSubmit} />
    </View>
  );
}

export default PaymentScreen;
