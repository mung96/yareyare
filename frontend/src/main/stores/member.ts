import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Member} from '@/main/shared/types/member/domain.ts';

type State = {
  isLogin: boolean;
  member: Member | null;
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
      state.member = null;
    },
    setMember(state, action: PayloadAction<Member>) {
      state.member = action.payload;
    },
  },
});

export default memberSlice.reducer;
export const {login, logout, setMember} = memberSlice.actions;
