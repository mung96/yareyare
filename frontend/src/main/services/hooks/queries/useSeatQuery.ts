import {useMutation, UseMutationOptions, useQuery} from '@tanstack/react-query';
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

type MutationOptionsWithoutFn = Omit<
  UseMutationOptions<
    SeatPriceResponse,
    unknown,
    {
      gameId: string;
      seats: number[];
    }
  >,
  'mutationFn'
>;

export function useSelectSeatMutation(
  mutationOption?: MutationOptionsWithoutFn,
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
