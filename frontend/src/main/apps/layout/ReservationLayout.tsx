import {ScrollView} from 'react-native';
import {ReactNode} from 'react';
import {COLORS} from '@/main/shared/styles';

const ReservationLayout = ({children}: {children: ReactNode}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 64,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      {children}
    </ScrollView>
  );
};

export default ReservationLayout;
