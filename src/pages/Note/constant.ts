import api from '@services/note.service'

export const TABLE_NAME = 'Note'
export const TABLE_KEY = 'note'
export const TABLE_DESCRIPTION = 'Note'
export const SEARCH_COLUMNS: string[] = ['name', 'slug']
export const API = api

export interface NoteState {
  id: string
  name: string
  slug: string
  content: string
  password?: string
  private: boolean
  createdAt: string
  updatedAt: string
  Histories: NoteHistoryState[]
}

export interface NoteHistoryState {
  id: string
  noteId: string
  content: string
  createdAt: string
  updatedAt: string
}
