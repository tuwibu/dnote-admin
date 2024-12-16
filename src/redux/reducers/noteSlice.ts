import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  notePassword: {
    [slug: string]: string
  }
}

const initialState: InitialState = {
  notePassword: {}
}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNotePassword: (state, action: PayloadAction<{ slug: string; password: string }>) => {
      state.notePassword[action.payload.slug] = action.payload.password
    }
  }
})

export const { setNotePassword } = noteSlice.actions

export default noteSlice.reducer
