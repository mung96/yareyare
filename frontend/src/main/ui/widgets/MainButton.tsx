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
  variant?: 'filledMain' | 'filledSub' | 'outlined';
  inValid?: boolean;
  size?: 'large' | 'medium';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

//TODO: 버튼 제출중일때 로딩띄우기
function MainButton({
  label,
  variant = 'filledMain',
  disabled = false,
  size = 'medium',
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
  },
  disabled: {
    backgroundColor: COLORS.PURPLE_200,
  },

  text: {
    fontSize: 12,
    fontWeight: '900',
  },

  filledMain: {
    backgroundColor: COLORS.PURPLE_100,
  },
  filledMainText: {
    color: COLORS.WHITE,
  },
  filledMainPressed: {
    backgroundColor: COLORS.PURPLE_200,
  },

  filledSub: {
    backgroundColor: COLORS.PURPLE_400,
  },
  filledSubText: {
    color: COLORS.WHITE,
  },
  filledSubPressed: {
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

  medium: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },

  large: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
});

export default MainButton;
