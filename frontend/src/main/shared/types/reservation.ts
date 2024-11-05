import {COLORS} from '../styles';
import {ImageSourcePropType} from 'react-native';

export type SectionKey =
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

export type GradeInput = {
  grade: Grade;
};

export type SeatInput = {};

export type UserInput = {};

export type GradeStep = Partial<GradeInput> &
  Partial<SeatInput> &
  Partial<UserInput>;
export type SeatStep = GradeInput & Partial<SeatInput> & Partial<UserInput>;
export type UserStep = GradeInput & SeatInput & Partial<UserInput>;
export type PaymentStep = GradeInput & SeatInput & UserInput;
