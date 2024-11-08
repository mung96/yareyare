import {StyleSheet, View} from 'react-native';
import GameScheduleCard from '@/main/ui/components/game/GameScheduleCard.tsx';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/clients/navigationCategory.ts';
import React from 'react';
import useGameModel from '@/main/services/hooks/useGameModel.ts';

function GameScheduleCardList() {
  //TODO: 경기일정 하나씩 불러오면됨
  //TODO: Slider 구현
  const dispatch = useDispatch();
  const {gameList} = useGameModel();
  return (
    <View style={styles.container}>
      {gameList?.map(gamePlan => (
        <GameScheduleCard
          key={gamePlan.gameId}
          dateTime={gamePlan.dateTime}
          homeTeam={gamePlan.homeTeam}
          awayTeam={gamePlan.awayTeam}
          onPress={() => dispatch(moveNavigation('reservation'))}
        />
      ))}
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
