//날짜를 추가해주는 기능
import {DateString} from '@/shared/types';

export function changeSelectedDate(dateString: DateString): {
  [key: DateString]: {selected: boolean};
} {
  return {
    [dateString]: {selected: true},
  };
}
