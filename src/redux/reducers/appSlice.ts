import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ThemeMode = 'dark' | 'light' | 'system'
export type LanguageMode = 'en' | 'vi'

export const isDarkMode = (mode: ThemeMode) => {
  if (mode === 'dark') return true
  if (mode === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

interface InitialState {
  themeMode: ThemeMode
  language: LanguageMode
}

const initialState: InitialState = {
  themeMode: 'light',
  language: 'en'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload
    },
    setLanguage: (state, action: PayloadAction<LanguageMode>) => {
      state.language = action.payload
    }
  }
})

export const { setLanguage, setThemeMode } = appSlice.actions

export default appSlice.reducer
