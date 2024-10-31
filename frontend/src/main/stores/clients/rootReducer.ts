import {combineReducers} from 'redux';
import navigationCategory from './navigationCategory.ts';

const rootReducer = combineReducers({
  navigationCategory,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
