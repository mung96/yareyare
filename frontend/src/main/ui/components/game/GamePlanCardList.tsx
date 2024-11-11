import {StyleSheet, View} from 'react-native';
import GameScheduleCard from '@/main/ui/components/game/GameScheduleCard.tsx';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import React from 'react';
import {setGameId} from '@/main/stores/game.ts';

type Props = {
  list: {
    gameId: number;
    dateTime: string;
    homeTeam: {name: string; logo: string; stadium: string};
    awayTeam: {name: string; logo: string; stadium: string};
  }[];
};
function GamePlanCardList({list}: Props) {
  //TODO: Slider 구현
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {list?.map(gamePlan => (
        <GameScheduleCard
          key={gamePlan.gameId}
          dateTime={gamePlan.dateTime}
          homeTeam={gamePlan.homeTeam}
          awayTeam={gamePlan.awayTeam}
          onPress={() => {
            dispatch(moveNavigation('waiting'));
            dispatch(setGameId(String(gamePlan.gameId)));
          }}
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

export default GamePlanCardList;
