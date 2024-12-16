import { ApiResponse } from '@typings/api'
import { AxiosResponse } from 'axios'
import axios from './axios.instance'

export interface LoginPayload {
  username: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

interface AuthApiState {
  login: (data: LoginPayload) => Promise<AxiosResponse<ApiResponse>>
}

const api: AuthApiState = {
  login: (data) => axios.post('/ajax/login', data)
}

export default api
