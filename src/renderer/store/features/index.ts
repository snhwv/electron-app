import { combineReducers } from '@reduxjs/toolkit';

import layoutDataReducer from './layoutSlice';
import playSongReducer from './playSongSlice';
import userInfoReducer from './userInfoSlice';
const reducer = combineReducers({
  layout: layoutDataReducer,
  playSong: playSongReducer,
  userInfo: userInfoReducer,
});
export default reducer;
