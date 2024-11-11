import {combineReducers} from 'redux';
import navigationCategory from './navigationCategory.ts';
import member from '@/main/stores/member.ts';
import reservation from '@/main/stores/reservation.ts';

const rootReducer = combineReducers({
  navigationCategory,
  member,
  reservation,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
