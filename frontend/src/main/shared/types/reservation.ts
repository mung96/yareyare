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

export type ReservationProcess =
  | 'GradeStep'
  | 'SeatStep'
  | 'UserStep'
  | 'PaymentStep';

export type GradeContext = {
  grade: Grade;
};

export type SeatContext = {};

export type UserContext = {};

export type GradeStep = Partial<GradeContext> &
  Partial<SeatContext> &
  Partial<UserContext>;
export type SeatStep = GradeContext &
  Partial<SeatContext> &
  Partial<UserContext>;
export type UserStep = GradeContext & SeatContext & Partial<UserContext>;
export type PaymentStep = GradeContext & SeatContext & UserContext;
