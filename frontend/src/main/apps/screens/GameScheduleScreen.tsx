import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import {getGameSchedule} from '@/main/apis/game.ts';
import Icon from 'react-native-vector-icons/AntDesign';
import useCalendar from '@/main/services/hooks/useCalendar.ts';
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function Calendar() {
  const {
    currentMonth,
    currentYear,
    handlePrevMonth,
    handleNextMonth,
    calendarDays,
  } = useCalendar();

  // const fetch = async () => {
  //   try {
  //     const response = await getGameSchedule(
  //       '1',
  //       String(currentYear),
  //       String(currentMonth + 1),
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetch();

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <View style={styles.header}>
        <Pressable style={styles.btnBox} onPress={handlePrevMonth}>
          <Icon name={'caretleft'} size={16} />
        </Pressable>
        <CustomText>
          <CustomText
            style={[
              styles.text,
              {fontWeight: 'bold', color: COLORS.PURPLE_100},
            ]}>
            {currentYear}
          </CustomText>
          <CustomText style={[styles.text]}>년 </CustomText>

          <CustomText
            style={[
              styles.text,
              {fontWeight: 'bold', color: COLORS.PURPLE_100},
            ]}>
            {currentMonth + 1}
          </CustomText>
          <CustomText style={[styles.text]}>월</CustomText>
        </CustomText>
        <Pressable style={styles.btnBox} onPress={handleNextMonth}>
          <Icon name={'caretright'} size={16} />
        </Pressable>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  btnBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
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
