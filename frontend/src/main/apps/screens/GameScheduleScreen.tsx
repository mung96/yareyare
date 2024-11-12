import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import useCalendar from '@/main/services/hooks/useCalendar.ts';
import {useGameScheduleQuery} from '@/main/services/hooks/queries/useGameScheduleQuery.ts';
import useGameScheduleModel from '@/main/services/hooks/useGameScheduleModel.ts';
import {SvgUri} from 'react-native-svg';
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function Calendar() {
  const {
    currentMonth,
    currentYear,
    handlePrevMonth,
    handleNextMonth,
    calendarDays,
  } = useCalendar();
  //TODO: teamId에 myteam을 넣어야함
  const {gameSchedule} = useGameScheduleModel(
    '1',
    String(currentYear),
    String(currentMonth + 1),
  );

  console.log(gameSchedule);
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
              {gameSchedule[day] ? (
                <>
                  <View
                    style={[
                      styles.timeBox,
                      gameSchedule[day].isHome && styles.homeBox,
                    ]}>
                    <CustomText
                      key={index}
                      style={[
                        styles.timeText,
                        gameSchedule[day].isHome && styles.homeText,
                      ]}>
                      {day}
                    </CustomText>
                  </View>
                  <View style={styles.content}>
                    <SvgUri
                      uri={gameSchedule[day].opponentTeamLogo}
                      width={24}
                      height={24}
                    />
                    <CustomText
                      key={index}
                      style={[
                        styles.description,
                        gameSchedule[day].description === 'WIN' &&
                          styles.descriptionWin,
                      ]}>
                      {gameSchedule[day].description}
                    </CustomText>
                    <View
                      style={[
                        styles.timeBox,
                        gameSchedule[day].isHome && styles.homeBox,
                      ]}>
                      <CustomText
                        key={index}
                        style={[
                          styles.timeText,
                          gameSchedule[day].isHome && styles.homeText,
                        ]}>
                        {gameSchedule[day].startTime}
                      </CustomText>
                    </View>
                  </View>
                </>
              ) : (
                <View style={[styles.timeBox]}>
                  <CustomText key={index} style={[styles.timeText]}>
                    {day}
                  </CustomText>
                </View>
              )}
              <View />
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
    height: 85,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  description: {
    fontSize: 14,
    color: COLORS.GRAY_300,
    fontWeight: 'bold',
    width: '100%',
  },
  descriptionWin: {
    color: COLORS.PURPLE_100,
    width: '100%',
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_100,
    width: '100%',
  },
  timeText: {
    width: '100%',
    color: COLORS.GRAY_300,
    textAlign: 'center',
    lineHeight: 20,
  },
  homeBox: {
    backgroundColor: COLORS.PURPLE_500,
    width: '100%',
  },
  homeText: {
    color: COLORS.WHITE,
  },
});

export default Calendar;
