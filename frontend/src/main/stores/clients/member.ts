import {createSlice} from '@reduxjs/toolkit';
import {Domain} from '@/main/shared/types/member/domain.ts';

type State = {
  isLogin: boolean;
  member: Domain | null;
};

const initialState: State = {
  isLogin: false,
  member: null,
};
//TODO 로그인시 회원정보 무조건 조회하다록 HOOK 짜기
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
