import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "./reducers/searchReducer";
import myListReducer from "./reducers/myListReducer";

const rootReducer = combineReducers({
  searchQuery: searchReducer,
  myList: myListReducer,
});

export default rootReducer;
