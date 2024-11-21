import dayjs from 'dayjs';
import {useState} from 'react';

function useCalendar() {
  const today = dayjs().toDate();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const generateCalendarDays = () => {
    const firstDayOfMonth = dayjs()
      .year(currentYear)
      .month(currentMonth)
      .date(1)
      .day(); //요일을 숫자로 반환
    const endDayOfMonth = dayjs()
      .year(currentYear)
      .month(currentMonth)
      .date(1)
      .endOf('month')
      .day();

    const daysInMonth = dayjs()
      .year(currentYear)
      .month(currentMonth)
      .daysInMonth();

    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push('');
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i.toString());
    }
    for (let i = endDayOfMonth + 1; i <= 6; i++) {
      daysArray.push('');
    }

    return daysArray;
  };

  const calendarDays = generateCalendarDays();
  return {
    currentMonth,
    currentYear,
    handlePrevMonth,
    handleNextMonth,
    calendarDays,
  };
}

export default useCalendar;
