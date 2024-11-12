import {useQuery} from '@tanstack/react-query';
import {getGameSchedule} from '@/main/apis/game.ts';

export function useGameScheduleQuery(
  teamId: string,
  year: string,
  month: string,
) {
  return useQuery({
    queryFn: () => getGameSchedule(teamId, year, month),
    queryKey: ['gameSchedule', teamId, year, month],
    staleTime: 1000 * 60 * 60,
  });
}
