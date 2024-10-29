import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {COLORS} from '@/main/shared/styles';

interface Props extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  inValid?: boolean;
  size?: 'large';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

//TODO: 버튼 제출중일때 로딩띄우기
function MainButton({
  label,
  variant = 'filled',
  disabled = false,
  size = 'large',
  style = null,
  ...props
}: Props) {
  return (
    <Pressable
      disabled={false}
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        disabled && styles.disabled,

        style,
      ]}
      {...props}>
      <View style={styles[size]}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  disabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: 12,
    fontWeight: '700',
  },

  filled: {
    backgroundColor: COLORS.PURPLE_400,
  },
  filledText: {
    color: COLORS.WHITE,
  },
  filledPressed: {
    backgroundColor: COLORS.PURPLE_200,
  },

  outlined: {
    borderColor: COLORS.PURPLE_100,
    borderWidth: 1,
  },
  outlinedPressed: {
    borderColor: COLORS.PURPLE_100,
    borderWidth: 1,
    opacity: 0.5,
  },
  outlinedText: {
    color: COLORS.PURPLE_100,
  },

  large: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainButton;
