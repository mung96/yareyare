import React from 'react';
import {Text, TextProps} from 'react-native';
import {COLORS} from '@/main/shared/styles';

const CustomText = ({children, style, ...props}: TextProps) => {
  return (
    <Text
      style={[{fontFamily: 'Pretendard-Regular', color: COLORS.BLACK}, style]}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
