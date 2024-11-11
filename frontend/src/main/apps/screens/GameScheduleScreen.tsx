import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

function Calendar() {
  const today = new Date();
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
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push('');
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i.toString());
    }

    return daysArray;
  };

  const calendarDays = generateCalendarDays();

  return (
    <CommonLayout>
      <View style={styles.header}>
        <Button title="이전달" onPress={handlePrevMonth} />
        <CustomText>{`${currentYear}년 ${currentMonth + 1}월`}</CustomText>
        <Button title="다음달" onPress={handleNextMonth} />
      </View>
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day, index) => (
          <CustomText key={index} style={styles.day}>
            {day}
          </CustomText>
        ))}
      </View>
      <View style={styles.calendar}>
        {calendarDays.map((day, index) => (
          <CustomText key={index} style={styles.date}>
            {day}
          </CustomText>
        ))}
      </View>
      <View style={styles.schedule}>
        <CustomText>경기 일정</CustomText>
        <CustomText>나의 팀 로고</CustomText>
      </View>
    </CommonLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  day: {
    flex: 1,
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  date: {
    width: '14%',
    textAlign: 'center',
    padding: 5,
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});

export default Calendar;
