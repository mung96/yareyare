import {useQuery} from '@tanstack/react-query';
import {
  getGamePlan,
  getGamePlanWithTeam,
  getRecentGameResult,
} from '@/main/apis/game.ts';

export function useGetGamePlanQuery() {
  return useQuery({
    queryFn: () => getGamePlan(),
    queryKey: ['gamePlan'],
  });
}

export function useGetGamePlanWithTeamQuery(teamId: string | null) {
  return useQuery({
    queryFn: () => getGamePlanWithTeam(String(teamId)),
    queryKey: ['gamePlanWithTeam', teamId],
    enabled: Boolean(teamId),
  });
}

export function useGetGameResultQuery() {
  return useQuery({
    queryFn: () => getRecentGameResult(),
    queryKey: ['gameResult'],
  });
}
