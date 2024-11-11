import {combineReducers} from 'redux';
import navigationCategory from './navigationCategory.ts';
import member from '@/main/stores/member.ts';
import game from '@/main/stores/game.ts';

const rootReducer = combineReducers({
  navigationCategory,
  member,
  game,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
