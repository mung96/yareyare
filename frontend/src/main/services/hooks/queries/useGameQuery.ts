import {useQuery} from '@tanstack/react-query';
import {getGamePlan, getRecentGameResult} from '@/main/apis/game.ts';

export function useGetGamePlanQuery() {
  return useQuery({
    queryFn: () => getGamePlan(),
    queryKey: ['gamePlan'],
  });
}

export function useGetGameResultQuery() {
  return useQuery({
    queryFn: () => getRecentGameResult(),
    queryKey: ['gameResult'],
  });
}
