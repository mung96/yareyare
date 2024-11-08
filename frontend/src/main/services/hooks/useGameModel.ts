import {useMemo} from 'react';
import {useGetGamePlanQuery} from '@/main/services/hooks/queries/useGameQuery.ts';

function useGameModel() {
  const {data: gamePlanListData} = useGetGamePlanQuery();
  const gameList = useMemo(() => {
    if (!gamePlanListData) {
      return [];
    }

    return gamePlanListData.games.map(gamePlanData => {
      return {
        gameId: gamePlanData.gameId,
        dateTime: gamePlanData.gameDate,
        homeTeam: {
          name: gamePlanData.homeTeamName,
          logo: gamePlanData.homeTeamLogo,
          stadium: gamePlanData.stadiumName,
        },
        awayTeam: {
          name: gamePlanData.awayTeamName,
          logo: gamePlanData.awayTeamLogo,
          stadium: gamePlanData.stadiumName,
        },
      };
    });
  }, [gamePlanListData]);

  return {gameList};
}

export default useGameModel;
