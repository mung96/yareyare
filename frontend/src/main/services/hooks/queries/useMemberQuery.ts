import {useQuery} from '@tanstack/react-query';
import {getMyInfo} from '@/main/apis/member.ts';

export function useGetMyInfoQuery() {
  return useQuery({
    queryFn: () => getMyInfo(),
    queryKey: ['member'],
  });
}
