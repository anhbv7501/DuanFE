import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  receipt: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    actionAddCart: (state, { payload }) => {
      state.carts = payload;
    },
    actionSetCurrentReceipt: (state, { payload }) => {
      state.receipt = payload;
    },
  },
});

export const { actionAddCart,actionSetCurrentReceipt } = productSlice.actions;
// selector
export const getCart = (state) => state.product.carts;
export const getReceipt = (state) => state.product.receipt;

// reducer
const productReducer = productSlice.reducer;
export default productReducer;
