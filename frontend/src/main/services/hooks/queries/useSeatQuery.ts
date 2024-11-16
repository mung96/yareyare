import {useMutation, useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {
  getRestSeatListWithGrade,
  getRestSeatListWithSection,
  patchSelectSeat,
} from '@/main/apis/game.ts';
import {SeatPriceResponse} from '@/main/shared/types/game/api.ts';
import {MutationOptionsWithoutFn} from '@/main/shared/types/common/api.ts';

export function useGradeQuery(gameId: string | null) {
  return useQuery({
    queryFn: () => getRestSeatListWithGrade(String(gameId)),
    queryKey: ['restSeatListWithGrade', gameId],
  });
}

export function useSeatQuery(gameId: string | null, gradeId: string | null) {
  return useSuspenseQuery({
    queryFn: () => getRestSeatListWithSection(String(gameId), String(gradeId)),
    queryKey: ['restSeatListWithSection', gameId, gradeId],
  });
}

export function useSelectSeatMutation(
  mutationOption?: MutationOptionsWithoutFn<
    {
      gameId: string;
      seats: number[];
    },
    SeatPriceResponse
  >,
) {
  return useMutation<
    SeatPriceResponse,
    unknown,
    {gameId: string; seats: number[]}
  >({
    mutationFn: async variables => {
      return await patchSelectSeat(variables.gameId, variables.seats);
    },
    ...mutationOption,
  });
}
