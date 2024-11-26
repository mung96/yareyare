import {COLORS} from '../../styles';
import {ImageSourcePropType} from 'react-native';

export type GradeKey =
  | 'FIRST_INFIELD'
  | 'FIRST_OUTFIELD'
  | 'CENTER'
  | 'THIRD_INFIELD'
  | 'THIRD_OUTFIELD';

export type Grade = {
  gradeName: GradeKey;
  color: (typeof COLORS)[keyof typeof COLORS];
  img: ImageSourcePropType;
  gradeId?: string;
  availableSeats?: number;
};
export type Seat = {
  section: string;
  row: string;
  col: string;
  seatId: number;
};
export type SeatList = {
  [key: number]: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
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
export type PaymentMethod = '계좌이체' | '카드결제' | '토스페이' | '카카오페이';
export type WaitingContext = {
  idempotencyKey: string;
};
export type SeatContext = {
  seatList: Seat[];
  price: number;
};

export type UserContext = {
  name: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  receiveMethod: ReceiveMethod;
};

export type PaymentContext = {
  paymentMethod: PaymentMethod;
  totalPrice: number;
};

export type GradeStep = WaitingContext &
  Partial<GradeContext> &
  Partial<SeatContext> &
  Partial<UserContext>;
export type SeatStep = WaitingContext &
  GradeContext &
  Partial<SeatContext> &
  Partial<UserContext>;
export type UserStep = WaitingContext &
  GradeContext &
  SeatContext &
  Partial<UserContext>;
export type PaymentStep = WaitingContext &
  GradeContext &
  SeatContext &
  UserContext;

export type PortOneStep = WaitingContext &
  GradeContext &
  SeatContext &
  UserContext &
  PaymentContext;
