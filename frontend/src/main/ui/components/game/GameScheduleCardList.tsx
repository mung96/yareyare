import {StyleSheet, View} from 'react-native';
import GameScheduleCard from '@/main/ui/components/game/GameScheduleCard.tsx';
import {TEAM_LIST} from '@/main/shared/constants/team.ts';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/clients/navigationCategory.ts';
import {useGetGamePlanQuery} from '@/main/services/hooks/queries/useGameQuery.ts';
import React from 'react';

function GameScheduleCardList() {
  //TODO: 경기일정 하나씩 불러오면됨
  //TODO: Slider 구현
  const dispatch = useDispatch();
  const a = useGetGamePlanQuery();
  console.log(a);
  return (
    <View style={styles.container}>
      <GameScheduleCard
        dateTime={'24.08.15(목)17:00'}
        awayTeam={TEAM_LIST.DOOSAN}
        homeTeam={TEAM_LIST.NC}
        onPress={() => dispatch(moveNavigation('reservation'))}
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
    paddingRight: 20,
    gap: 12,
    overflow: 'scroll',
  },
});

export default GameScheduleCardList;
