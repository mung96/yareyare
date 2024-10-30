import {COLORS} from '../styles';
import {ImageSourcePropType} from 'react-native';

export type SectionKey =
  | 'FIRST_INFIELD'
  | 'FIRST_OUTFIELD'
  | 'CENTER'
  | 'THIRD_INFIELD'
  | 'THIRD_OUTFIELD';

export type Section = {
  label: string;
  color: (typeof COLORS)[keyof typeof COLORS];
  img: ImageSourcePropType;
};

export type ReservationProcess =
  | 'SectionStep'
  | 'SeatStep'
  | 'UserStep'
  | 'PaymentStep';

export type SectionInput = {};

export type SeatInput = {};

export type UserInput = {};

export type SectionStep = Partial<SectionInput> &
  Partial<SeatInput> &
  Partial<UserInput>;
export type SeatStep = SectionInput & Partial<SeatInput> & Partial<UserInput>;
export type UserStep = SectionInput & SeatInput & Partial<UserInput>;
export type PaymentStep = SectionInput & SeatInput & UserInput;
