import { ApiResponse } from '@typings/api'
import { AxiosResponse } from 'axios'
import axios from './axios.instance'
import { NoteState } from '@pages/Note/constant'

interface ApiState {
  getNote: (slug: string, password?: string) => Promise<AxiosResponse<ApiResponse<NoteState>>>
  saveNote: (
    slug: string,
    data: Partial<NoteState>
  ) => Promise<AxiosResponse<ApiResponse<NoteState>>>
}

const api: ApiState = {
  getNote: (slug, password) => {
    const url = `/api/note/${slug}`
    return axios({
      method: 'POST',
      url,
      data: {
        password
      }
    })
  },
  saveNote: (slug, data) => {
    const url = `/api/note/${slug}`
    return axios({
      method: 'PUT',
      url,
      data
    })
  }
}

export default api
