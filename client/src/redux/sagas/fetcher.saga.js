/* eslint-disable no-console */
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetch } from "../../api/axiosClient";
import { changeMessageDialog, fetchWithLock, lockScreen, setIsLoading, unLockScreen } from "../reducers/common.reducer";

function* handleFetcher({ payload }) {
  yield put(lockScreen());
  // get parameters in payload
  const { data, successCallback, errorCallback } = payload;
  // call axios for request
  try {
    // Promise<Response>
    const response = yield call(fetch, data);

    const dataResponse = {
      status: 0,
      result: response.data,
    };
    console.log('zooo')

    // handle success
    successCallback && successCallback(dataResponse);
  } catch (error) {
    console.log('errr',error);
    
    const response = error;
    // if response status is 401 or 403 mean Unauthorized.
    if (response?.status === 401 || response?.status === 403) {
      // show message
      yield put(
        changeMessageDialog({
          open: true,
          data: {
            type: "ERROR",
            title: "Thông báo",
            message: "Đăng nhập thất bại",
          },
        })
      );

      // logout
      // yeild put(logout());

      // clear data
      localStorage.clear();

      // clear session storage
      sessionStorage.clear();
    } else {
      // show error message

      yield put(
        changeMessageDialog({
          open: true,
          data: {
            type: "ERROR",
            title: "Thông báo",
            message: error?.message || "Có lỗi xuất hiện",
          },
        })
      );
    }

    // error callback
    errorCallback && errorCallback(response);
    // end process
    return;
  } finally {
    yield put(setIsLoading(false));
    yield put(unLockScreen());
  }
}

export default function* fetcher() {
  yield takeEvery(fetchWithLock, handleFetcher);
}
