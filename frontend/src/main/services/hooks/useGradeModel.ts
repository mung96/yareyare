import {useMemo} from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import 'dayjs/locale/ko';
import {GRADE_LIST} from '@/main/shared/constants';
import {Grade} from '@/main/shared/types';
import {useGradeQuery} from '@/main/services/hooks/queries/useSeatQuery.ts';

function useGradeModel() {
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const {data: gradeListData} = useGradeQuery(gameId);
  const gradeList: Grade[] = useMemo(() => {
    if (!gradeListData) {
      return GRADE_LIST;
    }
    console.log(gradeListData);

    return gradeListData.grades.length === 5
      ? GRADE_LIST.map(grade => {
          return {
            ...gradeListData.grades.find(
              gradeInfo => gradeInfo.gradeName === grade.gradeName,
            ),
            gradeName: grade.gradeName,
            img: grade.img,
            color: grade.color,
          };
        })
      : GRADE_LIST;
  }, [gradeListData]);

  return {gradeList};
}

export default useGradeModel;
