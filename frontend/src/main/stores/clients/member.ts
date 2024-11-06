import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Member} from '@/main/types/member.ts';

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
    login(state, action: PayloadAction<Member>) {
      state.member = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.member = null;
      state.isLogin = false;
    },
  },
});

export default memberSlice.reducer;
export const {login, logout} = memberSlice.actions;
