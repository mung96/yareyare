import {Seat} from '@/main/apps/screens/reservationProcess';
import {includeObjectWithKeyAndValue} from '@/main/shared/utils/array.ts';
import {
  convertCharToNumber,
  convertNumberToChar,
} from '@/main/shared/utils/type.ts';

export function convertRowToIdx(row: string) {
  return convertCharToNumber(row) - 65;
}

export function convertIdxToRow(idx: number) {
  return convertNumberToChar(row + 65);
}

export function includeSeatWithRowAndCol(
  seatList: Seat[],
  row: string,
  col: number,
) {
  return includeObjectWithKeyAndValue(seatList, ['row', 'col'], [row, col]);
}

const row = 'K'.charCodeAt(0) - 'A'.charCodeAt(0);
const col = 20;

export function convertSeatResponseToData(response: {
  [section: number]: {
    [row: string]: {
      [col: number]: boolean;
    };
  };
}) {
  const seatList: boolean[][] = Array.from({length: row}, () =>
    Array(col).fill(false),
  );

  // Object.keys(response).map(sectionStr => {
  //   const section = Number(sectionStr);
  //   Object.keys(response[section]).map(row =>
  //     response[section][row].map(
  //       seat =>
  //         (seatList[row.charCodeAt(0) - 65][seat.col - 1] = seat.available),
  //     ),
  //   );
  // });

  return seatList;
}

type TSeatList = {
  number: boolean[][];
};

// class SeatList {
//   readonly items: TSeatList;
//
//   // constructor() {
//   //   this.items = :
//   // }
// }
