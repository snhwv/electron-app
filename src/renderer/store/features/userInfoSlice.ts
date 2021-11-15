import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '@globalApi';
const initialState: any = {
  userId: 477944154,
  userDetailInfo: {},
};

const layoutDataSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      const userInfo = action.payload;
      state.userId = userInfo?.account?.id;
      state.userDetailInfo = userInfo;
    },
  },
});
export const { updateUserInfo } = layoutDataSlice.actions;

export default layoutDataSlice.reducer;

export const getUserDetailInfo = createSelector(
  (state: any) => {
    return state.userInfo.userDetailInfo;
  },
  (userInfo: any) => {
    return userInfo;
  }
);
export const getUserId = createSelector(
  (state: any) => {
    return state.userInfo.userId;
  },
  (userId: any) => {
    return userId;
  }
);
