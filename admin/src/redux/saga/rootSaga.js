import { all } from 'redux-saga/effects'
import productSaga from './productSaga'
import receiptSaga from './receiptSaga'

export default function* rootSaga() {
  yield all([productSaga(), receiptSaga()])
}
