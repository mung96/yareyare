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
  purchaseStatus: string;
};

export type TicketListResponse = {
  tickets: {
    content: TicketResponse[];
  };
};
