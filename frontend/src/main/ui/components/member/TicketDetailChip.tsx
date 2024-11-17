import {StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';

type Props = {
  label: string;
  value: string;
};

function TicketDetailChip({label, value}: Props) {
  return (
    <View style={styles.layout}>
      <CustomText style={styles.label}>{label}</CustomText>
      <CustomText style={styles.value}>{value}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  label: {
    fontSize: 12,
    flexBasis: 80,
    flexShrink: 0,
    // textAlign: 'center',
    color: COLORS.GRAY_300,
  },
  value: {
    fontSize: 12,
    paddingHorizontal: 6,
    flex: 1, // 남은 공간을 차지하도록 설정
    color: COLORS.BLACK,
  },
});

export default TicketDetailChip;
