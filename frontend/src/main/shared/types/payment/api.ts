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

export type PaymentDto = {
  idempotencyKey?: string;
  totalPrice: number;
};

export type PaymentHistoryRequest = {
  gameId: number;
  seats: {
    seatId: number;
  }[];
};
