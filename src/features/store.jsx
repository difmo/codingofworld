import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
// import { auth } from "../firebase";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
