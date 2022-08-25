import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./redux.hook";
import { fetchWithLock } from "../redux/reducers/common.reducer";
import { API } from "../constants/api.constants";

const useProduct = () => {
  const dispatch = useAppDispatch();

  /**
   *API login
   * @param payload
   */
  const getProduct = useCallback(
    (payload) => {
      const { successCallback, errorCallback, page, per_page, name, options, ...data } = payload;
      try {
        const method = "GET";

        dispatch(
          fetchWithLock({
            data: {
              url: API.PRODUCT,
              method,
              params: {
                page,
                limit: per_page,
                name,
                options: options?.length > 0 ? options : null,
              },
            },
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

  /**
   *API login
   * @param payload
   */
  const getDetailProduct = useCallback(
    (payload) => {
      const { successCallback, errorCallback, id, ...data } = payload;
      try {
        const method = "GET";

        dispatch(
          fetchWithLock({
            data: {
              url: API.PRODUCT + `/${id}`,
              method,
            },
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

  /**
   *API login
   * @param payload
   */
  const getOptions = useCallback(
    (payload) => {
      const { successCallback, errorCallback, page, per_page, name, ...data } = payload;
      try {
        const method = "GET";

        dispatch(
          fetchWithLock({
            data: {
              url: API.OPTION,
              method,
            },
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

  /**
   *API
   * @param payload
   */
  const booking = useCallback(
    (payload) => {
      const { successCallback, errorCallback, ...data } = payload;
      try {
        const method = "POST";

        dispatch(
          fetchWithLock({
            data: {
              url: API.BOOKING,
              data,
              method,
            },
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

  /**
   *API
   * @param payload
   */
  const historyProduct = useCallback(
    (payload) => {
      const { successCallback, errorCallback, page, per_page, name, options, ...data } = payload;
      try {
        const method = "GET";

        dispatch(
          fetchWithLock({
            data: {
              url: API.GET_BOOKING,
              method,
              params: {
                page,
                limit: per_page,
                name,
              },
            },
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
    () => ({ getProduct, getOptions, getDetailProduct, booking, historyProduct }),
    [getProduct, getOptions, getDetailProduct, booking, historyProduct]
  );
};

export default useProduct;
