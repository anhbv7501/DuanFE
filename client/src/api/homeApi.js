import axiosClient from "./axiosClient";

const homeApi = {
  getTop: ({ label }) => {
    const url = "/foods";

    return axiosClient.get(url, { params: { label: label || undefined, pageSize: 6 } });
  },
};
export default homeApi;
