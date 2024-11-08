export type TeamKey =
  | 'DOOSAN'
  | 'KIWOOM'
  | 'LG'
  | 'KT'
  | 'NC'
  | 'SAMSUNG'
  | 'HANHWA'
  | 'KIA'
  | 'LOTTE'
  | 'SSG';

export type Game = {
  homeTeam: Team;
  awayTeam: Team;
  result: GameResult;
  status: string; //TODO: 백엔드랑 어떤거 있는지 협의해야함.
};

export type GameResult = {
  homeScore: number;
  awayScore: number;
};

export type Team = {
  name: string;
  logo: string;
  stadium: string;
};
