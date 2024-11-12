import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import dayjs from 'dayjs';
import {COLORS} from '@/main/shared/styles';
import {getGameSchedule} from '@/main/apis/game.ts';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function Calendar() {
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

  const fetch = async () => {
    try {
      const response = await getGameSchedule(
        '1',
        String(currentYear),
        String(currentMonth + 1),
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  fetch();

  return (
    <CommonLayout>
      <View style={styles.header}>
        <Button title="이전달" onPress={handlePrevMonth} />
        {/*<Icon />*/}
        <CustomText>{`${currentYear}년 ${currentMonth + 1}월`}</CustomText>
        <Button title="다음달" onPress={handleNextMonth} />
        <View style={styles.schedule}>
          <CustomText>경기 일정</CustomText>
          <CustomText>나의 팀 로고</CustomText>
        </View>
      </View>

      <View>
        <View style={styles.daysOfWeek}>
          {daysOfWeek.map((day, index) => (
            <CustomText key={index} style={[styles.day]}>
              {day}
            </CustomText>
          ))}
        </View>
        <View style={styles.calendar}>
          {calendarDays.map((day, index) => (
            <View style={[styles.date]}>
              <View>
                <CustomText key={index}>{day}</CustomText>
              </View>
              <View />
              <CustomText key={index}>WIN</CustomText>
              <CustomText key={index}>{day}</CustomText>
            </View>
          ))}
        </View>
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

    width: '100%',
  },
  day: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    width: 45,
    paddingVertical: 4,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    borderColor: COLORS.GRAY_200,
  },
  date: {
    width: 45,
    textAlign: 'center',
    height: 90,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});

export default Calendar;
