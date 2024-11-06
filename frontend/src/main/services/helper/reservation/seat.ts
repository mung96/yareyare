import {includeObjectWithKeyAndValue} from '@/main/utils/array.ts';
import {convertCharToNumber} from '@/main/utils/type.ts';
import {Seat} from 'src/main/types';

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
