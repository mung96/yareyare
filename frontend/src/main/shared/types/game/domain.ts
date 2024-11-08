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
  homeTeam: TeamKey;
  awayTeam: TeamKey;
  result: GameResult;
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
