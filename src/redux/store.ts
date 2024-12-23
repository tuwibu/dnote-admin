import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './reducers/authSlice'
import tableSlice from './reducers/tableSlice'
import appSlice from './reducers/appSlice'
import noteSlice from './reducers/noteSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'table', 'app', 'note']
}

const rootReducer = combineReducers({
  auth: authSlice,
  table: tableSlice,
  app: appSlice,
  note: noteSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
