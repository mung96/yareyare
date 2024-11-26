import React from 'react';
import {Animated, Easing} from 'react-native';
import {COLORS} from '@/main/shared/styles';

type Props = {
  width?: number;
  height?: number;
  borderRadius?: number;
};

function Skeleton({width = 50, height = 50, borderRadius = 12}: Props) {
  const animatedValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: false,
    }),
  ).start();

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.GRAY_100, COLORS.GRAY_500],
  });

  return (
    <Animated.View
      style={[
        {
          width: width,
          height: height,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
        },
      ]}
    />
  );
}

export default Skeleton;
