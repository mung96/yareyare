import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import PaymentMethodList from '@/main/ui/components/reservation/PaymentMethodList';
import ExpectedPayment from '@/main/ui/components/reservation/ExpectedPayment.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';
import {Controller, useForm} from 'react-hook-form';
import {PaymentContext} from '@/main/shared/types';

type Props = {
  onPrev: () => void;
  onSubmit: () => void;
};

function PaymentScreen({onPrev, onSubmit}: Props) {
  const {control, handleSubmit} = useForm<PaymentContext>({
    defaultValues: {
      paymentMethod: '카드결제',
    },
  });
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {value, onChange}}) => (
          <PaymentMethodList select={value} onSelect={onChange} />
        )}
        name="paymentMethod"
      />
      <ExpectedPayment />

      <MainButton
        label={'결제 및 완료'}
        onPress={handleSubmit(onSubmit)}
        size={'large'}
      />
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
