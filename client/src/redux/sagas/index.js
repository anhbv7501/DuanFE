import { all } from "redux-saga/effects";
import fetcher from "./fetcher.saga";

export function* rootSaga() {
  yield all([fetcher()]);
}
