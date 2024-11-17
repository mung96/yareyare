import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import useCalendar from '@/main/services/hooks/useCalendar.ts';
import useGameScheduleModel from '@/main/services/hooks/useGameScheduleModel.ts';
import {SvgUri} from 'react-native-svg';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import React from 'react';

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
  const {member} = useMemberModel();
  const {gameSchedule} = useGameScheduleModel(
    member?.myTeamId ? String(member?.myTeamId) : '1',
    String(currentYear),
    String(currentMonth + 1),
  );

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 12,
        gap: 8,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <View style={styles.headerContainer}>
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
        </View>
        <View style={styles.schedule}>
          <CustomText style={styles.scheduleText}>경기 일정</CustomText>
          <SvgUri uri={String(member?.myTeamLogo!)} width={32} height={32} />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 52,
    paddingRight: 64,
  },

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
    alignItems: 'center',
    gap: 12,
  },
  scheduleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
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
