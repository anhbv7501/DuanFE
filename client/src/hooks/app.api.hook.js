import { useCallback, useMemo } from "react";
import { API } from "../constants/api.constants";
import { fetchWithLock } from "../redux/reducers/common.reducer";
import { useAppDispatch } from "./redux.hook";
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const useAppApi = () => {
    const dispatch = useAppDispatch();

    /**
     *API upload
     * @param payload POST
     */
    const uploadFile = useCallback(
        (payload) => {
            const { successCallback, errorCallback, ...data } = payload;
            try {
                const method = "POST";
                let formData = new FormData();
                Object.keys(data).forEach((key) => {
                    formData.append(key, data[key]);
                });

                dispatch(
                    fetchWithLock({
                        data: {
                            url: API.UPLOADFILE,
                            baseURL: API.BASE_URL_IMAGE,
                            data: formData,
                            method,
                            headers: {
                                "content-type": "multipart/form-data",
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
     *API upload
     * @param payload POST
     */
    const uploadFiles = useCallback(
        (payload) => {
            const { successCallback, errorCallback, ...data } = payload;
            try {
                const method = "POST";

                dispatch(
                    fetchWithLock({
                        data: {
                            url: API.UPLOAD_MULTIPLEFILE,
                            data,
                            method,
                            headers: {
                                "Content-Type": "multipart/form-data",
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
        () => ({ uploadFile, uploadFiles }),
        [uploadFile, uploadFiles]
    );
};

export default useAppApi;
