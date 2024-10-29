import {SafeAreaView} from 'react-native';
import {useFunnel} from '@use-funnel/react-navigation-native';
import {
  PaymentStep,
  SeatStep,
  SectionStep,
  UserStep,
} from '@/main/shared/types';
import SectionScreen from '@/main/apps/screens/reservationProcess/SectionScreen.tsx';
import SeatScreen from '@/main/apps/screens/reservationProcess/SeatScreen.tsx';
import UserScreen from '@/main/apps/screens/reservationProcess/UserScreen.tsx';
import PaymentScreen from '@/main/apps/screens/reservationProcess/PaymentScreen.tsx';

function ReservationScreen() {
  const {
    step: reservationStep,
    history,
    context,
  } = useFunnel<{
    SectionStep: SectionStep;
    SeatStep: SeatStep;
    UserStep: UserStep;
    PaymentStep: PaymentStep;
  }>({
    id: 'reservation',
    initial: {
      step: 'SectionStep',
      context: {},
    },
  });

  return (
    <SafeAreaView>
      {reservationStep === 'SectionStep' && <SectionScreen />}
      {reservationStep === 'SeatStep' && <SeatScreen />}
      {reservationStep === 'UserStep' && <UserScreen />}
      {reservationStep === 'PaymentStep' && <PaymentScreen />}
    </SafeAreaView>
  );
}

export default ReservationScreen;
