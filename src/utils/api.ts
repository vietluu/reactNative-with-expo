import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '@env'
import { Platform } from 'react-native'

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
    let token

    if (Platform.OS === 'web') {
      // do something for ios
      token = await localStorage.getItem('access_token')
    } else if (Platform.OS === 'android') {
      // other thing for android
      token = await AsyncStorage.getItem('access_token')
    }

    if (token) config.headers.Authorization = 'Bearer ' + token
    else delete config.headers.Authorization

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export { api }
