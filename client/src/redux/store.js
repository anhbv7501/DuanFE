import { persistStore } from "redux-persist";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
