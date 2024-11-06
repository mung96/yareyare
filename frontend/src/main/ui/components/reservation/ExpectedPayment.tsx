import {StyleSheet, View} from 'react-native';
import React from 'react';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';
import {COLORS} from 'src/main/styles';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';

function ExpectedPayment() {
  return (
    <ReservationBox title={'결제 예정 금액'}>
      <View style={styles.container}>
        <View style={styles.priceContainer}>
          <CustomText style={styles.text}>상품가격</CustomText>
          <CustomText style={styles.price}>30,000</CustomText>
        </View>
        <Icon name={'plus-circle'} size={22} />
        <View style={styles.priceContainer}>
          <CustomText style={styles.text}>수수료</CustomText>
          <CustomText style={styles.price}>2000</CustomText>
        </View>
        <Icon name={'equals'} size={22} />
        <View style={styles.priceContainer}>
          <CustomText style={styles.text}>최종 결제금액</CustomText>
          <CustomText style={[styles.price, styles.totalPrice]}>
            30,000
          </CustomText>
        </View>
      </View>
    </ReservationBox>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    width: '100%',
    borderColor: COLORS.GRAY_200,
    borderWidth: 1,
    backgroundColor: COLORS.WHITE,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: 14,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  price: {
    fontWeight: '900',
    fontSize: 16,
  },
  totalPrice: {
    color: COLORS.PURPLE_100,
  },
});
export default ExpectedPayment;
