import {Dayjs} from 'dayjs';
import {DateString} from '@/main/shared/types';

export function convertDateToDateString(date: Dayjs): DateString {
  const dateString: DateString = date.toISOString().split('T')[0] as DateString;
  return dateString;
}
