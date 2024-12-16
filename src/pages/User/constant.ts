import api from '@services/user.service'

export const TABLE_NAME = 'User'
export const TABLE_KEY = 'user'
export const TABLE_DESCRIPTION = 'Change the user of the system'
export const SEARCH_COLUMNS: string[] = ['username']
export const API = api

export interface UserState {
  id: string
  username: string
  password: string
  createdAt: string
  updatedAt: string
}
