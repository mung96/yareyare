import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {ReactNode} from 'react';
import {COLORS} from '@/main/shared/styles';

type Props = {
  icon: ReactNode;
  title: String;
  onPress: () => void;
};

function MypageItem({icon, title, onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        {icon}
        <CustomText style={styles.text}>{title}</CustomText>
      </View>
      <Icon name={'chevron-forward'} size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 14,
    paddingLeft: 8,
    borderBottomWidth: 0.3,
    borderColor: COLORS.GRAY_200,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default MypageItem;
