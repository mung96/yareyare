import {SafeAreaView} from 'react-native';
import {ReactNode} from 'react';
import {COLORS} from '@/main/shared/styles';

const CommonLayout = ({children}: {children: ReactNode}) => {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 12,
        paddingTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      {children}
    </SafeAreaView>
  );
};

export default CommonLayout;
