import GameResultCard from '@/main/ui/components/game/GameResultCard.tsx';
import React, {useState} from 'react';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';
import GamePlanCardList from '@/main/ui/components/game/GamePlanCardList.tsx';
import DropdownComponent from '@/main/ui/components/game/DropDownComponent.tsx';
import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TeamItem from '@/main/ui/components/game/TeamItem.tsx';
import useTeamModel from '@/main/services/hooks/useTeamModel.ts';
import {useGetGamePlanWithTeamQuery} from '@/main/services/hooks/queries/useGameQuery.ts';
import useGameModel from '@/main/services/hooks/useGameModel.ts';
import {convertGamePlanListDataToView} from '@/main/services/helper/game/convert.ts';
import {COLORS} from '@/main/shared/styles';

function HomeScreen() {
  const {teamList} = useTeamModel();
  const [teamId, setTeamId] = useState<string | null>(null);
  const {gamePlanList} = useGameModel();
  const {data: gamePlanListWithTeamData} = useGetGamePlanWithTeamQuery(teamId);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 12,
        paddingTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <DropdownComponent
        data={teamList}
        placeholder={'팀 선택'}
        icon={() => <Icon name="people" size={22} style={styles.icon} />}
        renderItem={item => <TeamItem team={item} />}
        onChange={item => setTeamId(String(item.teamId))}
      />

      <GamePlanCardList
        list={
          teamId && gamePlanListWithTeamData
            ? gamePlanListWithTeamData.games.map(plan =>
                convertGamePlanListDataToView(plan),
              )
            : gamePlanList
        }
      />
      <GameResultCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    marginTop: 4,
  },
});
export default HomeScreen;
