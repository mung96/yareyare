import {useMemo} from 'react';
import {useTeamQuery} from '@/main/services/hooks/queries/useTeamQuery.ts';

function useTeamModel() {
  const {data: teamListData} = useTeamQuery();
  const teamList = useMemo(() => {
    if (!teamListData) {
      return [];
    }

    return teamListData.teams.map(teamData => {
      return {
        ...teamData,
        label: teamData.teamName,
        value: teamData.teamId,
      };
    });
  }, [teamListData]);

  return {teamList};
}

export default useTeamModel;
