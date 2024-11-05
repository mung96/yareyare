import {COLORS} from '../styles';
import {ImageSourcePropType} from 'react-native';

export type GradeKey =
  | 'FIRST_INFIELD'
  | 'FIRST_OUTFIELD'
  | 'CENTER'
  | 'THIRD_INFIELD'
  | 'THIRD_OUTFIELD';

export type Grade = {
  label: string;
  color: (typeof COLORS)[keyof typeof COLORS];
  img: ImageSourcePropType;
};
export type Seat = {
  section: number;
  row: string;
  col: number;
};
export type ReservationProcess =
  | 'GradeStep'
  | 'SeatStep'
  | 'UserStep'
  | 'PaymentStep';

export type GradeContext = {
  grade: Grade;
};
export type ReceiveMethod = '모바일 티켓' | '현장 수령';
export type SeatContext = {
  seatList: Seat[];
};

export type UserContext = {
  name: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  method: ReceiveMethod;
};

export type GradeStep = Partial<GradeContext> &
  Partial<SeatContext> &
  Partial<UserContext>;
export type SeatStep = GradeContext &
  Partial<SeatContext> &
  Partial<UserContext>;
export type UserStep = GradeContext & SeatContext & Partial<UserContext>;
export type PaymentStep = GradeContext & SeatContext & UserContext;
