import {SafeAreaView, StyleSheet} from 'react-native';
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
import {COLORS} from '@/main/shared/styles';
import StepBar from '@/main/ui/components/reservation/StepBar.tsx';

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
      step: 'UserStep',
      context: {},
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StepBar totalStep={4} currentStep={2} />
      {reservationStep === 'SectionStep' && (
        <SectionScreen onNext={() => history.push('SeatStep')} />
      )}
      {reservationStep === 'SeatStep' && (
        <SeatScreen
          onPrev={() => history.back()}
          onNext={() => history.push('UserStep')}
        />
      )}
      {reservationStep === 'UserStep' && (
        <UserScreen
          onPrev={() => history.back()}
          onNext={() => history.push('PaymentStep')}
        />
      )}
      {reservationStep === 'PaymentStep' && (
        <PaymentScreen
          onPrev={() => history.back()}
          onSubmit={() => '제출완료'}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
});
export default ReservationScreen;
