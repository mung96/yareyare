import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type NavigationCategory = 'reservation' | 'navbar';

type State = {
  navigationCategory: NavigationCategory;
};

const initialState: State = {
  navigationCategory: 'navbar',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    moveNavigation(state, action: PayloadAction<NavigationCategory>) {
      state.navigationCategory = action.payload;
    },
  },
});

export default navigationSlice.reducer;
export const {moveNavigation} = navigationSlice.actions;
