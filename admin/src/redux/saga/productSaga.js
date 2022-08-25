import { call, debounce, put, takeLatest } from '@redux-saga/core/effects'
import { toast } from 'react-toastify'
import productApi from 'src/config/productApi'
import { getProductOption } from 'src/config/productOptionAPI'
import {
  actionGeOneProduct,
  actionGeOneProductSuccess,
  actionGetAllProduct,
  actionGetAllProductFail,
  actionGetAllProductSuccess,
  actionGetOption,
  actionGetOptionFail,
  actionGetOptionSuccess,
  actionSearchProduct,
  actionSearchProductFail,
  actionSearchProductSuccess,
  actionSortProduct,
  actionSortProductFail,
  actionSortProductSuccess,
} from '../slice/productSlice'

function* getAllProduct({ payload }) {
  try {
    const page = payload || 1
    const product = yield call(productApi.getAll, page)
    yield put(actionGetAllProductSuccess(product.data?.payload))
  } catch (error) {
    yield put(actionGetAllProductFail())
  }
}
function* getOneProduct({ payload }) {
  try {
    const product = yield call(productApi.getOne, payload)
    yield put(actionGeOneProductSuccess(product.data?.payload))
  } catch (error) {
    yield put(actionGetAllProductFail())
  }
}
function* searchProduct({ payload }) {
  try {
    const product = yield call(productApi.searchProduct, payload)
    yield put(actionSearchProductSuccess(product.data?.payload))
  } catch (error) {
    yield put(actionSearchProductFail())
  }
}
function* sortProduct({ payload }) {
  try {
    const product = yield call(productApi.sortProduct, payload.by, payload.order)
    yield put(actionSortProductSuccess(product.data?.payload))
  } catch (error) {
    yield put(actionSortProductFail())
  }
}

export function* getOptionProductSaga() {
  try {
    const { data } = yield call(getProductOption)

    let helper = []
    let optValue = {}
    console.log('data', data)

    data.payload.data?.forEach((e) => {
      if (e.values && e?.values?.length > 0) {
        helper.push(e)
        optValue[e.id] = e.values
      }
    })

    yield put(actionGetOptionSuccess({ filter: optValue, helper }))
  } catch (error) {
    toast.error('System error ')
    yield put(actionGetOptionFail())
  }
}

function* productSaga() {
  yield takeLatest(actionGetAllProduct.type, getAllProduct)
  yield takeLatest(actionGeOneProduct.type, getOneProduct)
  yield debounce(500, actionSearchProduct.type, searchProduct)
  yield takeLatest(actionSortProduct.type, sortProduct)
  yield takeLatest(actionGetOption.type, getOptionProductSaga)
}
export default productSaga
