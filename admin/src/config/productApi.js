import AxiosClient from './axiosClient'

const productApi = {
  getAll: (page) => {
    const url = 'admin/product'

    return AxiosClient.get(url, { params: { page: page || 1 } })
  },
  getOne: (id) => {
    const url = 'admin/product/' + id

    return AxiosClient.get(url)
  },
  createProduct: (data) => {
    const url = 'admin/product'

    return AxiosClient.post(url, data)
  },
  updateProduct: (id, data) => {
    const url = 'admin/product/' + id

    return AxiosClient.put(url, data)
  },
  deleteProduct: (id) => {
    const url = 'admin/product/' + id

    return AxiosClient.delete(url)
  },
  searchProduct: (value) => {
    const url = 'admin/product'
    return AxiosClient.get(url, { params: { name: value || undefined } })
  },
  sortProduct: (by, order) => {
    const url = 'admin/product'
    return AxiosClient.get(url, { params: { ordername: `${by}`, order: `${order}` } })
  },
}
export default productApi
