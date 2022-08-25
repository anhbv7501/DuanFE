import axiosClient from "./axiosClient";

const foodApi = {
  getAllFoods: ({ pageNumber, category, search, sort, label }) => {
    const url = "/foods";

    return axiosClient.get(url, {
      params: {
        pageNumber: pageNumber || 1,
        pageSize: 9,
        sort: sort || undefined,
        label: label || undefined,
        search: search || undefined,
        category: category || undefined,
      },
    });
  },
  getCategory: () => {
    const url = "/foodcategory";
    return axiosClient.get(url);
  },
  createBill: (dt) => {
    const url = "/bill/create";

    return axiosClient.post(url, dt, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  },
  getBill: () => {
    const url = "/bill";

    return axiosClient.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  },
};
export default foodApi;
