export type TicketResponse = {
  purchaseId: number;
  seasonName: string;
  awayTeamName: string;
  homeTeamName: string;
  reservationId: string;
  reservationDate: string;
  stadiumName: string;
  gameDateTime: string;
  cancelDeadline: string;
  purchaseStatus: '예매완료' | '취소완료';
};

export type TicketListResponse = {
  tickets: {
    content: TicketResponse[];
    page: number;
    size: number;
    hasNext: boolean;
  };
};

// export type PaymentDto = {
//   idempotencyKey?: string;
//   vendor: string;
// };
export type PaymentRegistRequest = {
  idempotencyKey?: string;
  vendor: string;
};

export type PaymentHistoryResponse = {
  totalPrice: number;
};

export type PaymentHistoryRequest = {
  gameId: number;
  idempotencyKey: string;
  seatIds: number[];
};

export type PaymentDetailResponse = {
  ticketCount: number;
  startTicketId: string;
  totalPrice: string;
  chargePrice: string;
  stadiumName: string;
  ticketType: string;
  reservationDate: string;
  seats: {
    unitPrice: number;
    gradeName: number;
    seatNo: number;
    ticketId: number;
  }[];
  gameDateTime: string;
  seasonName: string;
  imageUrl: string;
  awayTeamName: string;
  purchaseStatus: string;
  cancelDeadline: string;
  endTicketId: string;
  seatPrice: string;
  homeTeamName: string;
};
