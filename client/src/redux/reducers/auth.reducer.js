import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionLoginSuccess: (state, { payload }) => {
      const { user } = payload;
      state.isLogin = true;
      state.user = user;
    },
    actionUpdate: (state, { payload }) => {
      const { user } = payload;
      state.isLogin = true;
      state.user = user;
    },
    actionLogout: (state) => {
      state.isLogin = false;
      state.user = {};
    },
  },
});

export const { actionLoginSuccess, actionLogout, actionUpdate } = authSlice.actions;
// selector
export const getIsLogin = (state) => state.auth.isLogin;
export const getUser = (state) => state.auth.user;

// reducer
const authReducer = authSlice.reducer;
export default authReducer;
