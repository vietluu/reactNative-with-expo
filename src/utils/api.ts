import axios from 'axios'
import { API_URL } from '@env'
import { getToken } from './token'

const apiPrefix = 'api/v1'

const api = axios.create({
  baseURL: `${API_URL}`,
  validateStatus: (status) => {
    return status >= 200 && status <= 500
  },
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
})

api.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const token = await getToken()

    if (token) config.headers.Authorization = 'Bearer ' + token
    else delete config.headers.Authorization

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export { api }
