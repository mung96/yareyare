import {StyleSheet, View} from 'react-native';
import GameScheduleCard from '@/main/ui/components/game/GameScheduleCard.tsx';
import {TEAM_LIST} from '@/main/shared/constants/team.ts';

function GameScheduleCardList() {
  //TODO: 경기일정 하나씩 불러오면됨
  //TODO: Slider 구현

  return (
    <View style={styles.container}>
      <GameScheduleCard
        dateTime={'24.08.15(목)17:00'}
        awayTeam={TEAM_LIST.DOOSAN}
        homeTeam={TEAM_LIST.NC}
        onPress={() => console.log('예매버튼 클릭')}
      />
      <GameScheduleCard
        dateTime={'24.08.15(목)17:00'}
        awayTeam={TEAM_LIST.DOOSAN}
        homeTeam={TEAM_LIST.NC}
        onPress={() => console.log('예매버튼 클릭')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
});

export default GameScheduleCardList;
