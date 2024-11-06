import {Team, TeamKey} from '@/main/types';

const LOGO_PATH = {
  DOOSAN: require('@/main/assets/Doosan.png'),
  KIWOOM: require('@/main/assets/Kiwoom.png'),
  LG: require('@/main/assets/Lg.png'),
  KT: require('@/main/assets/Kt.png'),
  NC: require('@/main/assets/Nc.png'),
  SAMSUNG: require('@/main/assets/Samsung.png'),
  HANHWA: require('@/main/assets/Hanhwa.png'),
  KIA: require('@/main/assets/Kia.png'),
  LOTTE: require('@/main/assets/Lotte.png'),
  SSG: require('@/main/assets/Ssg.png'),
};

//TODO: 백엔드 로직 나오면 값 수정해야함.
export const TEAM_LIST: {[key in TeamKey]: Team} = {
  DOOSAN: {name: '두산', logo: LOGO_PATH.DOOSAN, stadium: '고척 야구장'},
  KIWOOM: {name: '키움', logo: LOGO_PATH.KIWOOM, stadium: '고척 야구장'},
  LG: {name: '엘지', logo: LOGO_PATH.LG, stadium: '고척 야구장'},
  KT: {name: '케이티', logo: LOGO_PATH.KT, stadium: '고척 야구장'},
  NC: {name: '엔씨', logo: LOGO_PATH.NC, stadium: '고척 야구장'},
  SAMSUNG: {name: '삼성', logo: LOGO_PATH.SAMSUNG, stadium: '고척 야구장'},
  HANHWA: {name: '한화', logo: LOGO_PATH.HANHWA, stadium: '고척 야구장'},
  KIA: {name: '기아', logo: LOGO_PATH.KIA, stadium: '고척 야구장'},
  LOTTE: {name: '롯데', logo: LOGO_PATH.LOTTE, stadium: '고척 야구장'},
  SSG: {name: 'ssg', logo: LOGO_PATH.SSG, stadium: '고척 야구장'},
};
