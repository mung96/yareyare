import {useQuery} from '@tanstack/react-query';
import {
  getRestSeatListWithGrade,
  getRestSeatListWithSection,
} from '@/main/apis/game.ts';

export function useGradeQuery(gameId: string | null) {
  return useQuery({
    queryFn: () => getRestSeatListWithGrade(String(gameId)),
    queryKey: ['restSeatListWithGrade', gameId],
  });
}

export function useSeatQuery(gameId: string | null, gradeId: string | null) {
  return useQuery({
    queryFn: () => getRestSeatListWithSection(String(gameId), String(gradeId)),
    queryKey: ['restSeatListWithSection', gameId, gradeId],
  });
}
