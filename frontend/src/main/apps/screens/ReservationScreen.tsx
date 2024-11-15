import {SafeAreaView, StyleSheet} from 'react-native';
import {useFunnel} from '@use-funnel/react-navigation-native';
import {
  GradeContext,
  GradeStep,
  PaymentStep,
  SeatContext,
  SeatStep,
  UserContext,
  UserStep,
} from '@/main/shared/types';
import GradeScreen from '@/main/apps/screens/reservationProcess/GradeScreen.tsx';
import SeatScreen from '@/main/apps/screens/reservationProcess/SeatScreen.tsx';
import UserScreen from '@/main/apps/screens/reservationProcess/UserScreen.tsx';
import PaymentScreen from '@/main/apps/screens/reservationProcess/PaymentScreen.tsx';
import {COLORS} from '@/main/shared/styles';
import StepBar from '@/main/ui/components/reservation/StepBar.tsx';
import {convertReservationStepToStepNumber} from '@/main/services/helper/reservation/reservation.ts';
import {Suspense} from 'react';
import Skeleton from '@/main/ui/widgets/Skeleton.tsx';

function ReservationScreen() {
  const {
    step: reservationStep,
    history,
    context,
  } = useFunnel<{
    GradeStep: GradeStep;
    SeatStep: SeatStep;
    UserStep: UserStep;
    PaymentStep: PaymentStep;
  }>({
    id: 'reservation',
    initial: {
      step: 'GradeStep',
      context: {
        idempotencyKey: String(Math.floor(Math.random() * 1000000)),
      },
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StepBar
        totalStep={4}
        currentStep={convertReservationStepToStepNumber(reservationStep)}
      />
      {reservationStep === 'GradeStep' && (
        <GradeScreen
          onNext={(graderContext: GradeContext) =>
            history.push('SeatStep', graderContext)
          }
        />
      )}
      {reservationStep === 'SeatStep' && (
        <Suspense fallback={<Skeleton />}>
          <SeatScreen
            onPrev={() => history.back()}
            context={context}
            onNext={(seatContext: SeatContext) =>
              history.push('UserStep', seatContext)
            }
          />
        </Suspense>
      )}
      {reservationStep === 'UserStep' && (
        <UserScreen
          onPrev={() => history.back()}
          context={context}
          onNext={(userContext: UserContext) =>
            history.push('PaymentStep', userContext)
          }
        />
      )}
      {reservationStep === 'PaymentStep' && (
        <PaymentScreen onPrev={() => history.back()} context={context} />
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
