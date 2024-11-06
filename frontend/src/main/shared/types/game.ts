import {TeamKey} from '@/main/shared/types/team.ts';

export type Game = {
  homeTeam: TeamKey;
  awayTeam: TeamKey;
  result: Result;
};

export type Result = {
  homeScore: number;
  awayScore: number;
};
