import { combineReducers } from "@reduxjs/toolkit";

import layoutDataReducer from "./layoutSlice";
const reducer = combineReducers({
  layout: layoutDataReducer,
});
export default reducer;
