import {useSuspenseQuery} from '@tanstack/react-query';
import {getTeamList} from '@/main/apis/team.ts';

export function useTeamQuery() {
  return useSuspenseQuery({
    queryFn: getTeamList,
    queryKey: ['team'],
    staleTime: 5 * 60 * 1000,
  });
}
