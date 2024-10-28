import {Calendar} from 'react-native-calendars';
import {COLORS} from '@/shared/styles';
import {useState} from 'react';

type DateString = `${number}-${number}-${number}`; //YYYY-MM-DD

LocaleConfig.locales.ko = {
  monthNames: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

function DayPicker() {
  const [date, setDate] = useState<DateString | undefined>();

  //날짜를 추가해주는 기능
  function changeSelectedDate(dateString: DateString): {
    [key: DateString]: {selected: boolean};
  } {
    return {
      [dateString]: {selected: true},
    };
  }

  return (
    <Calendar
      style={{width: '100%'}}
      monthFormat={'MMM yyyy'}
      markedDates={changeSelectedDate(date!)}
      theme={{
        todayBackgroundColor: COLORS.PURPLE_100,
        arrowColor: COLORS.PURPLE_300,
        todayTextColor: COLORS.WHITE,
        selectedDayTextColor: COLORS.PURPLE_100,
      }}
      onDayPress={day => {
        setDate(day.dateString as DateString);
        console.log('selected day', day);
      }}
    />
  );
}

export default DayPicker;
