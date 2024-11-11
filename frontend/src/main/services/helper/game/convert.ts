import {GamePlanResponse} from '@/main/shared/types/game/api.ts';

export function convertGamePlanListDataToView(
  gamePlanData: GamePlanResponse['games'][0],
) {
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
}
