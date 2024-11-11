import {useMemo} from 'react';
import {useGetGamePlanQuery} from '@/main/services/hooks/queries/useGameQuery.ts';
import {convertGamePlanListDataToView} from '@/main/services/helper/game/convert.ts';

function useGameModel() {
  const {data: gamePlanListData} = useGetGamePlanQuery();

  const gamePlanList = useMemo(() => {
    if (!gamePlanListData) {
      return [];
    }

    return gamePlanListData.games.map(gamePlanData => {
      return convertGamePlanListDataToView(gamePlanData);
    });
  }, [gamePlanListData]);

  return {gamePlanList};
}

export default useGameModel;
