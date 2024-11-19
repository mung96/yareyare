import {StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';

function CouponBox() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText style={styles.boldText}>0M</CustomText>
        <CustomText style={styles.unitText}>마일리지</CustomText>
      </View>
      <View style={styles.textContainer}>
        <CustomText style={styles.boldText}>0</CustomText>
        <CustomText style={styles.unitText}>쿠폰</CustomText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 170,
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 24,
    paddingVertical: 22,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderRadius: 16,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  boldText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  unitText: {
    fontSize: 16,
  },
});
export default CouponBox;
