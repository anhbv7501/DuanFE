const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setSidebarShow(state) {
      return { ...state, sidebarShow: !state.sidebarShow }
    },
    setSidebarUnfoldabel(state) {
      return { ...state, sidebarUnfoldable: !state.sidebarUnfoldable }
    },
  },
})

export const { setSidebarShow, setSidebarUnfoldabel } = appSlice.actions
export default appSlice.reducer
