import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  gameId: string | null;
};

const initialState: State = {
  gameId: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setGameId(state, action: PayloadAction<string>) {
      state.gameId = action.payload;
    },
  },
});

export default reservationSlice.reducer;
export const {setGameId} = reservationSlice.actions;
