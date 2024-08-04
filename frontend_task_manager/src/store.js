import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
