import {ImageSourcePropType} from 'react-native';

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
  result: Result;
};

export type Result = {
  homeScore: number;
  awayScore: number;
};

export type Team = {
  name: string;
  logo: ImageSourcePropType;
  stadium: string;
};
