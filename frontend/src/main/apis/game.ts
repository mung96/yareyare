import {GameScheduleResponse} from '@/main/shared/types/game/api.ts';
import {Response} from '@/main/shared/types/common/api.ts';
import {apiRequester} from '@/main/apis/requester.ts';
import {END_POINT} from '@/main/shared/constants/api.ts';

export async function getGameSchedule() {
  const {data} = await apiRequester.get<Response<GameScheduleResponse>>(
    END_POINT.GAME,
  );
  return data.body;
}
