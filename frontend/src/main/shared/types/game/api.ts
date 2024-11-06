export type GameScheduleResponse = {
  schedules: {
    gameDate: string;
    gameStatus: string;
    isHome: boolean;
    startTime: string;
    region: string;
    opponentTeamLogo: string;
  }[];
};

export type RestSeatListResponse = {
  sections: {
    sectionName: string;
    rows: {
      rowName: string;
      seats: {
        isAvailable: boolean;
        seatId: number;
        seatNumber: number;
      }[];
    }[];
  };
};

export type GameResponse = {
  gameDate: string;
  seasonName: string;
  awayTeamName: string;
  stadiumName: string;
  startTime: string;
  homeTeamName: string;
};

export type SeatPriceResponse = {
  price: number;
};

export type RecentGameResultResponse = {
  gameDate: string;
  results: {
    gameStatus: string;
    homeTeamScore: number;
    awayTeamScore: number;
    awayTeamLogo: string;
    homeTeamLogo: string;
  }[];
};

export type GamePlanResponse = {
  gameId: number;
  gameDate: string;

  awayTeamName: string;
  stadiumName: string;
  startTime: string;
  awayTeamLogo: string;
  homeTeamLogo: string;
  homeTeamName: string;
};
