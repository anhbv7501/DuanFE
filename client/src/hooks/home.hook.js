import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./redux.hook";
import { fetchWithLock } from "../redux/reducers/common.reducer";
import { API } from "../constants/api.constants";

const useHome = () => {
  const dispatch = useAppDispatch();

  /**
   *API login
   * @param payload
   */
  const getProduct = useCallback(
    (payload) => {
      const { successCallback, errorCallback, ...data } = payload;
      try {
        const method = "GET";

        dispatch(
          fetchWithLock({
            data: { url: API.GETHOME, method, params: { option: data.option } },
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

  return useMemo(() => ({ getProduct }), [getProduct]);
};

export default useHome;
