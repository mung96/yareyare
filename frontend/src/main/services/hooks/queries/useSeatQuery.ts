import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getRestSeatListWithGrade,
  getRestSeatListWithSection,
  patchSelectSeat,
} from '@/main/apis/game.ts';
import {SeatPriceResponse} from '@/main/shared/types/game/api.ts';

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

export function useSelectSeatMutation() {
  return useMutation<
    SeatPriceResponse,
    unknown,
    {gameId: string; seats: number[]}
  >({
    mutationFn: async variables =>
      await patchSelectSeat(variables.gameId, variables.seats),
    onSuccess: data => {
      console.log(data);
    },
  });
}
