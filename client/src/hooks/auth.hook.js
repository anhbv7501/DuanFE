import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./redux.hook";
import { fetchWithLock } from "../redux/reducers/common.reducer";
import { API } from "../constants/api.constants";

const useAuth = () => {
  const dispatch = useAppDispatch();

  /**
   *API login
   * @param payload
   */
  const login = useCallback(
    (payload) => {
      const { successCallback, errorCallback, ...data } = payload;
      try {
        const method = "POST";

        dispatch(
          fetchWithLock({
            data: { url: API.LOGIN, data, method },
            successCallback,
            errorCallback,
          })
        );
      } catch (error) {
        errorCallback && errorCallback(error);
      }
    },
    [dispatch]
  );

  const register = useCallback(
    (payload) => {
      const { successCallback, errorCallback, ...data } = payload;
      try {
        const method = "POST";

        dispatch(
          fetchWithLock({
            data: { url: API.REGISTER, data, method },
            successCallback,
            errorCallback,
          })
        );
      } catch (error) {
        errorCallback && errorCallback(error);
      }
    },
    [dispatch]
  );

  const forgotPassword = useCallback(
    (payload) => {
      const { successCallback, errorCallback, ...data } = payload;
      try {
        const method = "POST";

        dispatch(
          fetchWithLock({
            data: { url: API.FORGOTPASSWORD, data, method },
            successCallback,
            errorCallback,
          })
        );
      } catch (error) {
        errorCallback && errorCallback(error);
      }
    },
    [dispatch]
  );

  const confirmPassword = useCallback(
    (payload) => {
      const { successCallback, errorCallback, ...data } = payload;
      try {
        const method = "POST";

        dispatch(
          fetchWithLock({
            data: { url: API.CONFIRMPASSWORD, data, method },
            successCallback,
            errorCallback,
          })
        );
      } catch (error) {
        errorCallback && errorCallback(error);
      }
    },
    [dispatch]
  );

  return useMemo(
    () => ({ login, register, forgotPassword, confirmPassword }),
    [login, register, forgotPassword, confirmPassword]
  );
};

export default useAuth;
