import AxiosClient from './axiosClient'

const adminApi = {
  login: (data) => {
    const url = 'admin/login'
    return AxiosClient.post(url, data)
  },
  forget: (data) => {
    const url = 'admin/forget-password'
    return AxiosClient.post(url, data)
  },
  changePass: (data, token) => {
    const url = 'admin/change-password'
    return AxiosClient.post(url, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
  },
}
export default adminApi
