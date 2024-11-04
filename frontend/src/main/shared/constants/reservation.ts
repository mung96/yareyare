import {COLORS} from '@/main/shared/styles';
import {Section, SectionKey} from '@/main/shared/types';

export const SECTION_IMG = {
  DEFAULT: require('@/main/assets/defaultStadium.png'),
  FIRST_INFIELD: require('@/main/assets/firstInfield.png'),
  FIRST_OUTFIELD: require('@/main/assets/firstoutfield.png'),
  CENTER: require('@/main/assets/center.png'),
  THIRD_INFIELD: require('@/main/assets/thirdInfield.png'),
  THIRD_OUTFIELD: require('@/main/assets/thirdOutfield.png'),
} as const;

export const SECTION_LIST: {[key in SectionKey]: Section} = {
  FIRST_INFIELD: {
    label: '1루 내야',
    color: COLORS.BLUE,
    img: SECTION_IMG.FIRST_INFIELD,
  },
  FIRST_OUTFIELD: {
    label: '1루 외야',
    color: COLORS.GREEN_100,
    img: SECTION_IMG.FIRST_OUTFIELD,
  },
  CENTER: {
    label: '중앙테이블석',
    color: COLORS.PINK,
    img: SECTION_IMG.CENTER,
  },
  THIRD_INFIELD: {
    label: '3루 내야',
    color: COLORS.BLUE,
    img: SECTION_IMG.THIRD_INFIELD,
  },
  THIRD_OUTFIELD: {
    label: '3루 외야',
    color: COLORS.GREEN_100,
    img: SECTION_IMG.THIRD_OUTFIELD,
  },
};
