/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLockScreen: false,
  messageDialog: {
    open: false,
  },
  confirmDialog: {
    open: false,
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    fetchWithLock: (state, payload) => {
      state.isLoading = true;
    },
    fetchWithoutLock: (state, payload) => {
      state.isLoading = true;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    lockScreen: (state) => {
      state.isLockScreen = true;
    },
    unLockScreen: (state) => {
      state.isLockScreen = false;
    },
    changeMessageDialog: (state, { payload }) => {
      state.messageDialog = { ...payload };
    },
    changeConfirmDialog: (state, { payload }) => {
      state.confirmDialog = { ...payload };
    },
  },
});

// action
export const {
  fetchWithLock,
  fetchWithoutLock,
  setIsLoading,
  lockScreen,
  unLockScreen,
  changeMessageDialog,
  changeConfirmDialog,
} = commonSlice.actions;

// reducer
const commonReducer = commonSlice.reducer;
export default commonReducer;
