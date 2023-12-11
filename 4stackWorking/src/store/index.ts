// ** Toolkit imports
import { configureStore, Dispatch } from '@reduxjs/toolkit'

// ** Reducers
import example from './apps/example'



export const store = configureStore({
  reducer: {
    example,
 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Redux {
  getState: any // ReturnType<typeof store.getState>
  dispatch: Dispatch<any>
}
