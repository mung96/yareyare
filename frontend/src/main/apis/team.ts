import {
  StadiumResponse,
  TeamListResponse,
} from '@/main/shared/types/team/api.ts';
import {apiRequester} from '@/main/apis/requester.ts';
import {END_POINT} from '@/main/shared/constants/api.ts';
import {Response} from '@/main/shared/types/common/api.ts';

//팀 리스트 조회
export async function getTeamList(): Promise<TeamListResponse> {
  const {data} = await apiRequester.get<Response<TeamListResponse>>(
    END_POINT.TEAM,
  );
  return data.body;
}

//경기장 모양 조회
export async function getStadium(): Promise<StadiumResponse> {
  const {data} = await apiRequester.get<Response<StadiumResponse>>(
    END_POINT.STADIUM,
  );
  return data.body;
}
