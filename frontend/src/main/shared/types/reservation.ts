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
