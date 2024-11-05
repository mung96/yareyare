import {includeObjectWithKeyAndValue} from '@/main/shared/utils/array.ts';
import {convertCharToNumber} from '@/main/shared/utils/type.ts';
import {Seat} from '@/main/shared/types';

export function convertRowToIdx(row: string) {
  return convertCharToNumber(row) - 65;
}

export function includeSeatWithRowAndCol(
  seatList: Seat[],
  section: number,
  row: string,
  col: number,
) {
  return includeObjectWithKeyAndValue(
    seatList,
    ['section', 'row', 'col'],
    [section, row, col],
  );
}
