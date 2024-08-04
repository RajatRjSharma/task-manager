import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  form: { active: false, content: {}, isEdit: false },
  loader: false,
  notification: { active: false, message: "", type: "" },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload || [];
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    clearForm: (state) => {
      state.form = { active: false, content: {}, isEdit: false };
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = { active: false, message: "", type: "" };
    },
  },
});

export const {
  setTasks,
  setForm,
  clearForm,
  setLoader,
  clearNotification,
  setNotification,
} = taskSlice.actions;

export default taskSlice.reducer;
