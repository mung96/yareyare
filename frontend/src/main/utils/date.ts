import {Dayjs} from 'dayjs';
import {DateString} from '@/main/types';

export function convertDateToDateString(date: Dayjs): DateString {
  return date.format('YYYY-MM-DD') as DateString;
}
