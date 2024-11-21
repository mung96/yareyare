import {COLORS} from '@/main/shared/styles';
import {Grade, GradeKey} from '@/main/shared/types';

export const GRADE_IMG = {
  DEFAULT: require('@/main/assets/defaultStadium.png'),
  FIRST_INFIELD: require('@/main/assets/firstInfield.png'),
  FIRST_OUTFIELD: require('@/main/assets/firstoutfield.png'),
  CENTER: require('@/main/assets/center.png'),
  THIRD_INFIELD: require('@/main/assets/thirdInfield.png'),
  THIRD_OUTFIELD: require('@/main/assets/thirdOutfield.png'),
} as const;

export const GRADE_LIST: Grade[] = [
  {
    gradeId: '1',
    gradeName: '1루 내야' as GradeKey,
    color: COLORS.BLUE,
    img: GRADE_IMG.FIRST_INFIELD,
    availableSeats: 0,
  },
  {
    gradeId: '2',
    gradeName: '1루 외야' as GradeKey,
    color: COLORS.GREEN_100,
    img: GRADE_IMG.FIRST_OUTFIELD,
    availableSeats: 0,
  },
  {
    gradeId: '3',
    gradeName: '중앙테이블석' as GradeKey,
    color: COLORS.PINK,
    img: GRADE_IMG.CENTER,
    availableSeats: 0,
  },
  {
    gradeId: '4',
    gradeName: '3루 내야' as GradeKey,
    color: COLORS.BLUE,
    img: GRADE_IMG.THIRD_INFIELD,
    availableSeats: 0,
  },
  {
    gradeId: '5',
    gradeName: '3루 외야' as GradeKey,
    color: COLORS.GREEN_100,
    img: GRADE_IMG.THIRD_OUTFIELD,
    availableSeats: 0,
  },
];
