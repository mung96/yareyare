import {View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import GameScheduleCard from '@/main/ui/components/game/GameScheduleCard.tsx';
import {TEAM_LIST} from '@/main/shared/constants/team.ts';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      {/*<DayPicker />*/}
      <GameScheduleCard
        dateTime={'24.08.15(목)17:00'}
        awayTeam={TEAM_LIST.DOOSAN}
        homeTeam={TEAM_LIST.NC}
        onPress={() => console.log('예매버튼 클릭')}
      />
    </View>
  );
}

export default HomeScreen;
