import {Button, StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import React, {useState} from 'react';
import {COLORS} from '@/main/shared/styles';
import PaymentMethodList from '@/main/ui/components/reservation/PaymentMethodChip.tsx';

type Props = {
  onPrev: () => void;
  onSubmit: () => void;
};

function PaymentScreen({onPrev, onSubmit}: Props) {
  const [method, setMethod] = useState('');
  return (
    <View>
      <View style={styles.componentContainer}>
        <CustomText style={styles.inputContainerTitle}>
          결제수단 선택
        </CustomText>
        <View style={styles.inputContainer}>
          <PaymentMethodList select={method} onSelect={setMethod} />
        </View>
      </View>
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
