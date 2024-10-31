import {ReservationProcess} from '@/main/shared/types';
import {neverExpected} from '@/main/shared/utils/type.ts';

export function convertReservationStepToStepNumber(step: ReservationProcess) {
  if (step === 'SectionStep') {
    return 1;
  }
  if (step === 'SeatStep') {
    return 2;
  }
  if (step === 'UserStep') {
    return 3;
  }
  if (step === 'PaymentStep') {
    return 4;
  }
  neverExpected(step);
}
