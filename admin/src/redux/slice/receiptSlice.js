const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  receipts: [],
  isLoading: false,
  currentPage: 1,
  totalPage: 3,
}

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    actionGetAllReceipt: (state, action) => {
      state.isLoading = true
    },
    actionGetAllReceiptSuccess: (state, action) => {
      state.isLoading = false
      state.receipts = action.payload.data
      state.totalPage = action.payload?.total
      state.currentPage = action.payload?.page
    },
    actionGetAllReceiptFail: (state, action) => {
      state.isLoading = false
      state.receipts = []
      state.totalPage = 3
      state.currentPage = 1
    },
  },
})

//selector
export const getListReceipts = (state) => state.receipt.receipts
export const getLoadingReceipts = (state) => state.receipt.isLoading
export const getCurrentPageReceipts = (state) => state.receipt.currentPage
export const getTotalPageReceipts = (state) => state.receipt.totalPage
//action
export const { actionGetAllReceipt, actionGetAllReceiptSuccess, actionGetAllReceiptFail } =
  receiptSlice.actions
//reducer
const receiptReducer = receiptSlice.reducer
export default receiptReducer
