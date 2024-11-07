import {
  GameResponse,
  GameScheduleResponse,
  RecentGameResultResponse,
  RestSeatListWithGradeResponse,
  RestSeatListWithSectionResponse,
  SeatPriceResponse,
} from '@/main/shared/types/game/api.ts';
import {Response} from '@/main/shared/types/common/api.ts';
import {apiRequester} from '@/main/apis/requester.ts';
import {END_POINT} from '@/main/shared/constants/api.ts';
//경기 일정 조회 API (팀선택 X)
export async function getGamePlan(): Promise<
  GameScheduleResponse<'schedules'>
> {
  const {data} = await apiRequester.get<
    Response<GameScheduleResponse<'schedules'>>
  >(END_POINT.GAME);
  return data.body;
}
//경기 일정 조회 API (팀선택 O)
export async function getGameScheduleWithTeam(
  teamId: string,
): Promise<GameScheduleResponse<'games'>> {
  const {data} = await apiRequester.get<
    Response<GameScheduleResponse<'games'>>
  >(END_POINT.GAME_PLAN(teamId));
  return data.body;
}
//최근 경기 결과 조회
export async function getRecentGameSchedule(): Promise<RecentGameResultResponse> {
  const {data} = await apiRequester.get<Response<RecentGameResultResponse>>(
    END_POINT.GAME_RESULT,
  );
  return data.body;
}
//경기 상세 정보 조회
export async function getGameDetail(gameId: string): Promise<GameResponse> {
  const {data} = await apiRequester.get<Response<GameResponse>>(
    END_POINT.GAME_DETAIL(gameId),
  );
  return data.body;
}

//등급별 잔여 좌석 조회
export async function getRestSeatListWithGrade(
  gameId: string,
): Promise<RestSeatListWithGradeResponse> {
  const {data} = await apiRequester.get<
    Response<RestSeatListWithGradeResponse>
  >(END_POINT.GAME_GRADE(gameId));
  return data.body;
}

//구역내 잔여 좌석 조회
export async function getRestSeatListWithSection(
  gameId: string,
  gradeId: string,
): Promise<RestSeatListWithSectionResponse> {
  const {data} = await apiRequester.get<
    Response<RestSeatListWithSectionResponse>
  >(END_POINT.GAME_SEAT(gameId), {params: {gradeId}});
  return data.body;
}
//좌석선택
export async function postSelectSeat(
  gameId: string,
  seats: number[],
): Promise<SeatPriceResponse> {
  const {data} = await apiRequester.post<Response<SeatPriceResponse>>(
    END_POINT.GAME_SEAT(gameId),
    {seats},
  );
  return data.body;
}
//경기 스케줄 조회 (달력에서 사용하는거)
export async function getGameSchedule(
  teamId: string,
  year: string,
  month: string,
): Promise<SeatPriceResponse> {
  const {data} = await apiRequester.get<Response<SeatPriceResponse>>(
    END_POINT.GAME_SCHEDULE(teamId),
    {params: {year, month}},
  );
  return data.body;
}
