import {Seat} from '@/main/apps/screens/reservationProcess';
import {includeObjectWithKeyAndValue} from '@/main/shared/utils/array.ts';

export function includeSeatWithRowAndCol(
  seatList: Seat[],
  row: string,
  col: number,
) {
  return includeObjectWithKeyAndValue(seatList, ['row', 'col'], [row, col]);
}
