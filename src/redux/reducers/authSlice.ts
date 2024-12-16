import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  id: string
  username: string
  accessToken?: string
}

interface FillUserState {
  username: string
  password: string
}

interface InitialState {
  isAuthenticated: boolean
  accessToken?: string
  user?: UserState
  fill?: FillUserState
  error?: string
}

const initialState: InitialState = {
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      const { accessToken, ...user } = action.payload
      state.isAuthenticated = true
      state.user = user
      state.accessToken = accessToken
    },
    loginFailed: (state, action: PayloadAction<InitialState>) => {
      state.isAuthenticated = false
      state.user = undefined
      state.error = action.payload.error
    },
    logoutUser: (state) => {
      state.isAuthenticated = false
      state.error = undefined
      state.user = undefined
    },
    setFill: (state, action: PayloadAction<FillUserState>) => {
      state.fill = action.payload
    }
  }
})

export const { loginSuccess, loginFailed, logoutUser, setFill } = authSlice.actions

export default authSlice.reducer
