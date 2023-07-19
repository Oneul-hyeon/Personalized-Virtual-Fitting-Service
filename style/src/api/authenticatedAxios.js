import axios from 'axios'

const authenticatedAxios = axios.create()

authenticatedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default authenticatedAxios
