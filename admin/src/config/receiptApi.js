import axiosClient from './axiosClient'

const receiptApi = {
  getReceipts: (page = 1) => {
    const url = 'admin/receipt'
    return axiosClient.get(url, { params: { page: page } })
  },
  changeStatusReceipts: (id, status) => {
    const url = 'admin/receipt/change-status/' + id
    return axiosClient.put(url, { status: status })
  },
}
export default receiptApi
