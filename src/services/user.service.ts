import { API_PREFIX } from '@configs/index'
import { UserState } from '@pages/User/constant'
import ApiState from '@typings/api'
import axios from './axios.instance'

const pathApi = 'user'

const api: ApiState<UserState> = {
  getAll: (data) => {
    const url = `/${API_PREFIX}/${pathApi}/ajax`
    return axios.post(url, data)
  },
  addItem: (data) => {
    const url = `/${API_PREFIX}/${pathApi}/add`
    return axios.post(url, data)
  },
  editItem: (id, data) => {
    const url = `/${API_PREFIX}/${pathApi}/edit/${id}`
    return axios.post(url, data)
  },
  deleteItem: (id) => {
    const url = `/${API_PREFIX}/${pathApi}/delete/${id}`
    return axios.post(url)
  }
}

export default api
