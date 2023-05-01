import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/reducer'
const store = configureStore({
  reducer: {
    authReducer: AuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export { store }
