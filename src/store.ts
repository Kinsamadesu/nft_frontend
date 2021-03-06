import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './Features/settingsSlice'
import walletReducer from './Features/walletSlice'

export const store = configureStore({
  reducer: { settings: settingsReducer, wallet: walletReducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
