import {convertCharToNumber} from '@/main/shared/utils/type.ts';
import {Seat} from '@/main/shared/types';

export function convertRowToIdx(row: string) {
  return convertCharToNumber(row) - 65;
}

export function includeSeat(seatList: Seat[], seatId: string) {
  // return includeObjectWithKeyAndValue(seatList, ['seatId'], [seatId]);
  return seatList.some(seat => Number(seat.seatId) === Number(seatId));
}

// export function convertSeatResponseToView(
//   response: RestSeatListWithSectionResponse['sections'],
// ): SeatList {
//   const seatList: SeatList = {};
//
//   return seatList;
// }

export function addSeat(
  arr: Seat[],
  seat: Seat,
  onChange: (value: Seat[]) => void,
) {
  const newSeatList = [...arr, seat];
  onChange(newSeatList);
}

export function removeSeat(
  arr: Seat[],
  seatId: string,
  onChange: (value: Seat[]) => void,
) {
  const newSeatList = arr.filter(item => !(String(item.seatId) === seatId));
  onChange(newSeatList);
}
