import {Calendar} from 'react-native-calendars';
import {COLORS} from '@/shared/styles';
import {useState} from 'react';

type DateString = `${number}-${number}-${number}`; //YYYY-MM-DD

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
