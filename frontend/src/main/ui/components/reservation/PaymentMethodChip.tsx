import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import React from 'react';
import {COLORS} from '@/main/shared/styles';

type Props = {
  select: string;
  onSelect: (method: string) => void;
};
const paymentMethod = [
  {label: '무통장입금', value: '무통장입금'},
  {label: '계좌이체', value: '계좌이체'},
  {
    label: '카드결제',
    value: '카드결제',
  },
  {label: '삼성페이', value: '삼성페이'},
  {label: '토스페이', value: '토스페이'},
  {label: '카카오페이', value: '카카오페이'},
];

function PaymentMethodList({select, onSelect}: Props) {
  return (
    <View style={styles.container}>
      {paymentMethod.map(method => (
        <Pressable
          style={[styles.item, select === method.value && styles.selectItem]}
          onPress={() => onSelect(method.value)}>
          <CustomText
            style={[styles.text, select === method.value && styles.selectText]}
            key={method.label}>
            {method.label}
          </CustomText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 20,
  },
  item: {
    borderRadius: 6,
    width: 128,
    height: 36,
    borderColor: COLORS.GRAY_200,
    borderWidth: 1,
    backgroundColor: COLORS.WHITE,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  selectItem: {
    backgroundColor: COLORS.PURPLE_100,
    borderWidth: 0,
  },
  selectText: {
    color: COLORS.WHITE,
    fontWeight: 'normal',
  },
});

export default PaymentMethodList;
