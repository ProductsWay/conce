import { combineReducers } from "@reduxjs/toolkit";

import emptySplitApi from "../services/empty_split_api";
import userReducer from "../services/user_slice";

const rootReducer = combineReducers({
  user: userReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

export default rootReducer;
