import { API_BASE_URL } from '@configs/index'
import { loginFailed } from '@redux/reducers/authSlice'
import store from '@redux/store'
import axios from 'axios'

const axiosAuthInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
})

axiosAuthInstance.interceptors.request.use(async (config: any) => {
  const accessToken = store.getState().auth.accessToken
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    }
  }
  return config
})

axiosAuthInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(loginFailed(error?.response?.data?.message || error))
    }
    return Promise.reject(error)
  }
)

export default axiosAuthInstance
