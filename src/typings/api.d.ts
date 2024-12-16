import { AxiosResponse } from 'axios'
import { IAjax, ResponseAjax } from './datatable'
import FormData from 'form-data'

export interface ApiResponse<T = null> {
  success: boolean
  message?: string
  data?: T
}

interface ApiState<TData> {
  getAll: (data: IAjax) => Promise<AxiosResponse<ResponseAjax<TData>>>
  getAllChild?: (childId: string, data: IAjax) => Promise<AxiosResponse<ResponseAjax<TData>>>
  addItem?: (data: Partial<TData>) => Promise<AxiosResponse<ApiResponse>>
  editItem?: (id: React.Key, data: Partial<TData>) => Promise<AxiosResponse<ApiResponse>>
  deleteItem?: (id: React.Key) => Promise<AxiosResponse<ApiResponse>>
  importItem?: (data: FormData) => Promise<AxiosResponse<ApiResponse>>
  all?: () => Promise<AxiosResponse<ApiResponse<TData[]>>>
}

export default ApiState
