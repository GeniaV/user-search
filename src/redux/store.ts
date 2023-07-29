import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loginSearchReducer from "./loginSearchSlice";
import paginationReducer from "./paginationSlice";
import userDetailsReducer from "./userDetailSlice";

const store = configureStore({
  reducer: {
    usersReducer,
    loginSearchReducer,
    paginationReducer,
    userDetailsReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;