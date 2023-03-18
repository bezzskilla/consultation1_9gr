import { configureStore } from '@reduxjs/toolkit'
import { getInitialValues } from './initialValues'
import { userReducer } from './slices/user'

export const store = configureStore({
  preloadedState: getInitialValues(),
  reducer: {
    user: userReducer,
    // filter: filterReducer
  }
})

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
