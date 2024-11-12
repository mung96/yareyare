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
export type RestSeatListWithGradeResponse = {
  grades: {
    gradeId: string;
    gradeName: string;
    availableSeats: number;
  }[];
};
export type RestSeatListWithSectionResponse = {
  sections: {
    sectionName: string;
    rows: {
      rowName: string;
      seats: {
        isAvailable: boolean;
        seatId: string;
        seatNumber: number;
      }[];
    }[];
  }[];
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
  games: {
    gameId: number;
    gameDate: string;
    ticketOpenTime: string;
    awayTeamName: string;
    stadiumName: string;
    startTime: string;
    awayTeamLogo: string;
    homeTeamLogo: string;
    homeTeamName: string;
  }[];
};
