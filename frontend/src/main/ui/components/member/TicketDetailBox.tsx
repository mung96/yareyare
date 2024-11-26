import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {ReactNode} from 'react';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

type Props = {
  children: ReactNode;
  title: string;
  button?: ReactNode;
};

function TicketDetailBox({children, title, button}: Props) {
  return (
    <View style={styles.layout}>
      <View style={styles.titleBox}>
        <CustomText style={styles.title}>{title}</CustomText>
        {button}
      </View>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  titleBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
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
  },
});

export default TicketDetailBox;
