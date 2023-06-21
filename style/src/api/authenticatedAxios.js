import axios from 'axios'

const authenticatedAxios = axios.create()

authenticatedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Handle any error from setting the headers.
    return Promise.reject(error)
  }
)

export default authenticatedAxios
