import {useGetMyInfoQuery} from '@/main/services/hooks/queries/useMemberQuery.ts';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {setMember} from '@/main/stores/member.ts';
import {useTeamQuery} from '@/main/services/hooks/queries/useTeamQuery.ts';

function useMemberModel() {
  const {
    data: myInfoData,
    refetch: refetchMember,
    isLoading: memberLoading,
  } = useGetMyInfoQuery();
  const {data: teamListData, isLoading: teamLoading} = useTeamQuery();
  const dispatch = useDispatch();

  const member = useMemo(() => {
    if (myInfoData && teamListData) {
      const teamLogo = teamListData.teams.find(
        team => String(team.teamId) === String(myInfoData.myTeamId),
      )?.teamLogo;
      const memberInfo = {...myInfoData, myTeamLogo: teamLogo};
      dispatch(setMember(memberInfo));
      return memberInfo;
    }
  }, [myInfoData, dispatch, teamListData]);

  const isLoading = useMemo(() => {
    return memberLoading || teamLoading;
  }, [memberLoading, teamLoading]);
  return {member, refetchMember, isLoading};
}

export default useMemberModel;
