import {useMutation, useQuery} from '@tanstack/react-query';
import {getMyInfo} from '@/main/apis/member.ts';
import {apiRequester} from '@/main/apis/requester.ts';
import {removeEncryptStorage} from '@/main/shared/utils/encryptStorage.ts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthParamList} from '@/main/apps/navigations/AuthNavigation.tsx';
import {PATH} from '@/main/shared/constants';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import {logout} from '@/main/stores/member.ts';

export function useGetMyInfoQuery() {
  return useQuery({
    queryFn: () => getMyInfo(),
    queryKey: ['member'],
  });
}

export function useLogoutMutation() {
  const navigation = useNavigation<NativeStackScreenProps<AuthParamList>>();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => apiRequester.post('members/logout'),
    onSuccess: async () => {
      await removeEncryptStorage('token');
      dispatch(logout());
    },
  });
}
