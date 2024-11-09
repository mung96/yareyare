import {View} from 'react-native';
import {ReactNode} from 'react';
import {COLORS} from '@/main/shared/styles';

const CommonLayout = ({children}: {children: ReactNode}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      {children}
    </View>
  );
};

export default CommonLayout;
