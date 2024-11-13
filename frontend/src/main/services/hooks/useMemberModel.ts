import {useGetMyInfoQuery} from '@/main/services/hooks/queries/useMemberQuery.ts';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {setMember} from '@/main/stores/member.ts';
import {useTeamQuery} from '@/main/services/hooks/queries/useTeamQuery.ts';

function useMemberModel() {
  const {data: myInfoData} = useGetMyInfoQuery();
  const {data: teamListData} = useTeamQuery();
  const dispatch = useDispatch();

  const member = useMemo(() => {
    if (myInfoData && teamListData) {
      console.log(myInfoData);
      const teamLogo = teamListData.teams.find(
        team => String(team.teamId) === String(myInfoData.myTeamId),
      )?.teamLogo;
      const memberInfo = {...myInfoData, myTeamLogo: teamLogo};
      dispatch(setMember(memberInfo));
      return memberInfo;
    }
  }, [myInfoData, dispatch, teamListData]);

  return {member};
}

export default useMemberModel;
