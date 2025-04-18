import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import React from 'react';
import {COLORS} from '@/main/shared/styles';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';

type Props = {
  select: string;
  onSelect: (method: string) => void;
};
const paymentMethod = [
  {
    label: '카드결제',
    value: '카드결제',
  },
  {label: '계좌이체', value: '계좌이체'},

  {label: '토스페이', value: '토스페이'},
  {label: '카카오페이', value: '카카오페이'},
];

function PaymentMethodList({select, onSelect}: Props) {
  return (
    <ReservationBox title={'결제 방법 입력'}>
      <View style={styles.container}>
        {paymentMethod.map(method => (
          <Pressable
            key={method.label}
            style={[styles.item, select === method.value && styles.selectItem]}
            onPress={() => onSelect(method.value)}>
            <CustomText
              style={[
                styles.text,
                select === method.value && styles.selectText,
              ]}
              key={method.label}>
              {method.label}
            </CustomText>
          </Pressable>
        ))}
      </View>
    </ReservationBox>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 24,
    columnGap: 20,
  },
  item: {
    borderRadius: 6,
    width: 160,
    height: 52,
    borderColor: COLORS.GRAY_200,
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
