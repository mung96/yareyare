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
  seatId: string;
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
};

export type GradeStep = Partial<GradeContext> &
  Partial<SeatContext> &
  Partial<UserContext>;
export type SeatStep = GradeContext &
  Partial<SeatContext> &
  Partial<UserContext>;
export type UserStep = GradeContext & SeatContext & Partial<UserContext>;
export type PaymentStep = GradeContext & SeatContext & UserContext;
