import {FlatList, View, StyleSheet} from 'react-native';
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
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={list}
        horizontal={true}
        renderItem={({item: gamePlan}) => (
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
        )}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default GamePlanCardList;
