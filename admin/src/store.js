import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga/rootSaga'
import appSlice from './redux/slice/index'
import productReducer from './redux/slice/productSlice'
import receiptReducer from './redux/slice/receiptSlice'

const rootReducer = combineReducers({
  app: appSlice,
  product: productReducer,
  receipt: receiptReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware)
  },
  devTools: true,
})

sagaMiddleware.run(rootSaga)

export default store
