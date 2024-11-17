import {Pressable, StyleSheet} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

type Props = {
  title: string;
  onPress: () => void;
};

function TicketDetailButton({title, onPress}: Props) {
  return (
    <Pressable style={styles.layout} onPress={onPress}>
      <CustomText style={styles.title}>{title}</CustomText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    marginTop: 3,
    width: 100,
    height: 19,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GRAY_500,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: COLORS.GRAY_300,
  },
});

export default TicketDetailButton;
