import axiosClient from './axiosClient'

export const getAllProductOption = async (page = 1, search = '', limit = '') => {
  const data = await axiosClient.get(`/options?page=${page}`)

  return data
}

export const getProductOption = async () => {
  const data = await axiosClient.get(`/admin/option`)

  return data
}

export const createProductOption = async ({ name, meta }) => {
  const data = await axiosClient.post('/admin/option', { name: name, meta: meta })

  return data
}

export const deleteProductOption = async (id) => {

  const data = await axiosClient.delete(`/admin/option/${id}`)

  return data
}

export const updateProductOption = async (name, meta, id) => {
  const data = await axiosClient.put(`/admin/option/${id}`, { name: name, meta: meta })

  return data
}

export const getAllOption = async () => {
  const data = await axiosClient.get('/options/all')

  return data
}
