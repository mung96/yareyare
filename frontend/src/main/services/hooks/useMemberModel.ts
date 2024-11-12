import {useGetMyInfoQuery} from '@/main/services/hooks/queries/useMemberQuery.ts';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {setMember} from '@/main/stores/member.ts';

function useMemberModel() {
  const {data: myInfoData} = useGetMyInfoQuery();
  const dispatch = useDispatch();

  const member = useMemo(() => {
    if (myInfoData) {
      dispatch(setMember(myInfoData));
      return myInfoData;
    }
  }, [myInfoData, dispatch]);

  return {member};
}

export default useMemberModel;
