import axios from 'axios'

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {},
)

export default axiosClient
