import {useMutation, useQuery} from '@tanstack/react-query';
import {getMyInfo} from '@/main/apis/member.ts';
import {apiRequester} from '@/main/apis/requester.ts';
import {removeEncryptStorage} from '@/main/shared/utils/encryptStorage.ts';
import {useDispatch} from 'react-redux';
import {logout} from '@/main/stores/member.ts';

export function useGetMyInfoQuery() {
  return useQuery({
    queryFn: () => getMyInfo(),
    queryKey: ['member'],
  });
}

export function useLogoutMutation() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => apiRequester.post('members/logout'),
    onSuccess: async () => {
      await removeEncryptStorage('token');
      dispatch(logout());
    },
  });
}
