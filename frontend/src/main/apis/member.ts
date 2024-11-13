import {
  StadiumResponse,
  TeamListResponse,
} from '@/main/shared/types/team/api.ts';
import {apiRequester} from '@/main/apis/requester.ts';
import {END_POINT} from '@/main/shared/constants/api.ts';
import {Response} from '@/main/shared/types/common/api.ts';
import {
  MemberResponse,
  MyTeamResponse,
} from '@/main/shared/types/member/api.ts';

//내 정보 조회
export async function getMyInfo(): Promise<MemberResponse> {
  const {data} = await apiRequester.get<Response<MemberResponse>>(
    END_POINT.MEMBER,
  );
  return data.body;
}
//본인 인증
export async function postCertificate(impUid: string) {
  const response = await apiRequester.post<Response<null>>(
    END_POINT.CERTIFICATION,
    {impUid},
  );
  return response;
}

//로그아웃
export async function postLogout() {
  await apiRequester.post<Response<null>>(END_POINT.LOGOUT);
}

//마이 팀 변경
export async function patchMyTeam(teamId: number): Promise<MyTeamResponse> {
  const {data} = await apiRequester.patch<Response<MyTeamResponse>>(
    END_POINT.MY_TEAM,
    {
      teamId,
    },
  );
  return data.body;
}
