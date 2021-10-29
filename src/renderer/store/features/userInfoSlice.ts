import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '@globalApi';
const initialState: any = {
  userId: 477944154,
};

const layoutDataSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      const userId = action.payload;
      state.userId = userId;
    },
  },
});
export const { updateUserInfo } = layoutDataSlice.actions;

export default layoutDataSlice.reducer;

export const getUserInfo = createSelector(
  (state: any) => {
    return state.userInfo;
  },
  (userInfo: any) => {
    return userInfo;
  }
);
