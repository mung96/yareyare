import {useMemo} from 'react';
import {useGetGameDetailQuery} from '@/main/services/hooks/queries/useGameQuery.ts';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.locale('ko');
function useGameDetailModel() {
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const {data: gameDetailData} = useGetGameDetailQuery(gameId);
  const gameDetail = useMemo(() => {
    if (!gameDetailData) {
      return {
        name: '',
        date: '',
        place: '',
      };
    }

    return {
      name:
        gameDetailData.seasonName +
        gameDetailData.homeTeamName +
        ' vs ' +
        gameDetailData.awayTeamName,
      date:
        dayjs(gameDetailData.gameDate).format('YYYY.MM.DD') +
        '(' +
        dayjs(gameDetailData.gameDate).format('dd') +
        ')',
      place: gameDetailData.stadiumName,
    };
  }, [gameDetailData]);

  return {gameDetail};
}

export default useGameDetailModel;
