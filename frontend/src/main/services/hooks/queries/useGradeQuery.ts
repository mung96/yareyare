import {useQuery} from '@tanstack/react-query';
import {getRestSeatListWithGrade} from '@/main/apis/game.ts';

export function useGradeQuery(gameId: string | null) {
  return useQuery({
    queryFn: () => getRestSeatListWithGrade(String(gameId)),
    queryKey: ['restSeatListWithGrade', gameId],
  });
}
