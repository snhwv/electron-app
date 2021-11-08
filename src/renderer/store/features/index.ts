import { combineReducers } from '@reduxjs/toolkit';

import layoutDataReducer from './layoutSlice';
import playSongReducer from './playSongSlice';
import songListSlice from './songListSlice';
import userInfoReducer from './userInfoSlice';
const reducer = combineReducers({
  layout: layoutDataReducer,
  playSong: playSongReducer,
  userInfo: userInfoReducer,
  songList: songListSlice,
});
export default reducer;
