import {useGameScheduleQuery} from '@/main/services/hooks/queries/useGameScheduleQuery.ts';
import {useMemo} from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type GameStatus = 'WIN' | 'LOSE' | 'DRAW' | 'OFF' | 'SCHEDULED';
type GameSchedule = {
  gameDate: string;
  gameStatus: GameStatus;
  isHome: boolean;
  opponentTeamLogo: string;
  region?: string;
  startTime: string;
  description: string;
};

function useGameScheduleModel(teamId: string, year: string, month: string) {
  const {data: gameScheduleData} = useGameScheduleQuery(teamId, year, month);

  const gameSchedule: Record<string, GameSchedule> = useMemo(() => {
    if (!gameScheduleData) {
      return {};
    }

    const schedule: Record<string, GameSchedule> = {};
    gameScheduleData.schedules.map(game => {
      const gameDateKey = String(dayjs(game.gameDate).date());
      schedule[gameDateKey] = {
        gameDate: game.gameDate,
        gameStatus: game.gameStatus as GameStatus,
        isHome: game.isHome,
        opponentTeamLogo: game.opponentTeamLogo,
        description:
          game.gameStatus === 'SCHEDULED' ? game.region : game.gameStatus,
        startTime: dayjs(game.startTime, 'HH:mm:ss').format('HH:mm'),
      };
    });

    return schedule;
  }, [gameScheduleData]);

  return {gameSchedule};
}

export default useGameScheduleModel;
