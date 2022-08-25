import axiosClient from './axiosClient'

const uploadApi = {
  uploadFile: (data) => {
    const url = '/upload'

    return axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
export default uploadApi
