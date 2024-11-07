import {useQuery} from '@tanstack/react-query';
import {getGamePlan} from '@/main/apis/game.ts';

export function useGetGamePlanQuery() {
  return useQuery({
    queryFn: () => getGamePlan(),
    queryKey: ['gamePlan'],
  });
}
