import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import {COLORS} from '@/main/shared/styles';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

type Props = {
  title?: string;
  children: ReactNode;
  style?: any;
};

function ReservationBox({title, children}: Props) {
  return (
    <View style={styles.container}>
      {title && <CustomText style={styles.title}>{title}</CustomText>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 20,
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 360,
    minHeight: 200,
  },
  title: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '900',
  },
});
export default ReservationBox;
