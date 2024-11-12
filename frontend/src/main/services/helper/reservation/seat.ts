import {includeObjectWithKeyAndValue} from '@/main/shared/utils/array.ts';
import {convertCharToNumber} from '@/main/shared/utils/type.ts';
import {Seat} from '@/main/shared/types';
import {RestSeatListWithSectionResponse} from '@/main/shared/types/game/api.ts';
import {SeatList} from '@/main/ui/components/reservation/SeatContainment.tsx';

export function convertRowToIdx(row: string) {
  return convertCharToNumber(row) - 65;
}

export function includeSeat(seatList: Seat[], seatId: string) {
  // return includeObjectWithKeyAndValue(seatList, ['seatId'], [seatId]);
  return seatList.some(seat => seat.seatId === seatId);
}

export function convertSeatResponseToView(
  response: RestSeatListWithSectionResponse['sections'],
): SeatList {
  const seatList: SeatList = {};

  return seatList;
}
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
