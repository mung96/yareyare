import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {ReactNode} from 'react';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

type Props = {
  children: ReactNode;
  title: string;
};

function TicketDetailBox({children, title}: Props) {
  return (
    <View style={styles.layout}>
      <CustomText style={styles.title}>{title}</CustomText>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  container: {
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 28,
    paddingVertical: 10,
    width: '100%',
    borderRadius: 6,

    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    minHeight: 100,
  },
});

export default TicketDetailBox;
