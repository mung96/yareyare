import {SafeAreaView} from 'react-native';
import {useFunnel} from '@use-funnel/react-navigation-native';
import {
  PaymentStep,
  SeatStep,
  SectionStep,
  UserStep,
} from '@/main/shared/types';

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

  return <SafeAreaView>asd</SafeAreaView>;
}

export default ReservationScreen;
