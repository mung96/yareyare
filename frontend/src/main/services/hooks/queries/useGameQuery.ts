import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {
  getGameDetail,
  getGamePlan,
  getGamePlanWithTeam,
  getRecentGameResult,
} from '@/main/apis/game.ts';

export function useGetGamePlanQuery() {
  return useSuspenseQuery({
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

export function useGetGameDetailQuery(gameId: string | null) {
  return useQuery({
    queryFn: () => getGameDetail(String(gameId)),
    queryKey: ['gameDetail', gameId],
    enabled: Boolean(gameId),
  });
}
