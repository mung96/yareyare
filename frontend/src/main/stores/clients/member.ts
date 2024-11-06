import {createSlice} from '@reduxjs/toolkit';
import {Member} from '@/main/shared/types/member.ts';

type State = {
  isLogin: boolean;
  member: Member | null;
};

const initialState: State = {
  isLogin: false,
  member: null,
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export default memberSlice.reducer;
export const {login, logout} = memberSlice.actions;
