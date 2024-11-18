import {FlatList, View, StyleSheet, Alert} from 'react-native';
import GameScheduleCard from '@/main/ui/components/game/GameScheduleCard.tsx';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import React from 'react';
import {setGameId} from '@/main/stores/game.ts';
import {useGetMyInfoQuery} from '@/main/services/hooks/queries/useMemberQuery.ts';

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
  const {data: member, refetch: refetchMember, isSuccess} = useGetMyInfoQuery();

  const blockUser = () => {
    Alert.alert('알림', '예매를 하려면 본인인증이 필요해요.', [
      {
        text: '본인인증 하러가기',
        onPress: () => {
          dispatch(moveNavigation('certificate'));
        },
        style: 'destructive',
      },
    ]);
  };

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
              //TODO: 본인인증 로직.
              //TODO: 로직 disabled
              if (!member?.isCertificated) {
                blockUser();
              } else {
                dispatch(moveNavigation('waiting'));
                dispatch(setGameId(String(gamePlan.gameId)));
              }
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{width: 18}} />}
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
