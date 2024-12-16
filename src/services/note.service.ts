import { API_PREFIX } from '@configs/index'
import { NoteState } from '@pages/Note/constant'
import ApiState from '@typings/api'
import axios from './axios.instance'

const pathApi = 'note'

export interface NoteApiState extends ApiState<NoteState> {
  rollback: (id: string) => Promise<void>
}

const api: NoteApiState = {
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
  },
  rollback: (id) => {
    const url = `/${API_PREFIX}/${pathApi}/rollback/${id}`
    return axios.post(url)
  }
}

export default api
