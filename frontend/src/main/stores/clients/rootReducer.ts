import {combineReducers} from 'redux';
import navigationCategory from './navigationCategory.ts';
import member from '@/main/stores/clients/member.ts';

const rootReducer = combineReducers({
  navigationCategory,
  member,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
