import {Calendar} from 'react-native-calendars';
import {COLORS} from '@/main/shared/styles';
import {useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {convertDateToDateString} from '@/main/shared/utils';
import {DateString} from '@/main/shared/types';
import {changeSelectedDate} from '@/main/services/helper';
import '@/main/services/helper/LocalConfig.ts';

//TODO: disabled 막아야하는 날짜
//TODO: 디테일한 css 설정해야함.
function DayPicker() {
  const [date, setDate] = useState<DateString | undefined>();

  return (
    <Calendar
      style={{width: '100%', borderRadius: 20, padding: 8}}
      monthFormat={'yyyy년 M월'}
      markedDates={date && changeSelectedDate(date)}
      minDate={convertDateToDateString(dayjs())}
      theme={{
        arrowColor: COLORS.PURPLE_300,
        todayTextColor: COLORS.PURPLE_100,
        selectedDayTextColor: COLORS.WHITE,
        selectedDayBackgroundColor: COLORS.PURPLE_100,
      }}
      onDayPress={day => {
        setDate(day.dateString as DateString);
      }}
    />
  );
}

export default DayPicker;
