import axiosClient from './axiosClient'

export const getAllUser = async (page = 1, search = '', limit = '') => {
  const data = await axiosClient.get(`user?page=${page}&name=${search}`)

  return data
}

export const changeStatus = async (userId, dataChange) => {
  const data = await axiosClient.put(`user/change-status/` + userId, dataChange)

  return data
}
