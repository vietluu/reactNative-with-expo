import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/reducer'
import PostReducer from './post/postReducer'
import commentReducer from './post/commentReducer'
import ProfileReducer from './profile/reducer'

const store = configureStore({
  reducer: {
    authReducer: AuthReducer,
    postReducer: PostReducer,
    commentReducer: commentReducer,
    profileReducer: ProfileReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export { store }
