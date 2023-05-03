import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, setToken } from '../../utils'
import { RootState } from '..'

//init state auth
const initialState = {
  token: null,
  isLoading: false,
  hasErr: false,
}

//action login
let res: any = {}
export const login = createAsyncThunk(`auth/local/login`, async (body: any) => {
  res = await api.post(`/auth/local/signin`, body)
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

//logup action
export const logup = createAsyncThunk(`auth/logup`, async (body) => {
  res = await api.post(`/api/v1/auth/local/signup`, body)
  if (res.status == 200 || res.status == 201) {
    return await res.data
  }
  return await res.json()
})

//slice
const AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },

  extraReducers: (builder) => {
    // khi login dang xu li
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
      state.hasErr = false
    })
    // xu li login thanh cong
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.access_token
      setToken(action.payload.access_token)
      state.isLoading = false
      state.hasErr = false
    })
    // khi login xay ra loi
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.hasErr = true
    })

    //khi logup dang xu li
    builder.addCase(logup.pending, (state) => {
      state.isLoading = true
      state.hasErr = false
    })
    // xu li logup thanh cong
    builder.addCase(logup.fulfilled, (state, action) => {
      state.token = action.payload.access_token
      state.isLoading = false
      state.hasErr = false
    })
    // khi logup xay ra loi
    builder.addCase(logup.rejected, (state) => {
      state.isLoading = false
      state.hasErr = true
    })
  },
})

export const { logout } = AuthReducer.actions

// export const isloading = (state: RootState) => state.authReducer.isLoading
// export const haserr = (state: RootState) => state.authReducer.hasErr
// export const token = (state: RootState) => state.authReducer.token

export default AuthReducer.reducer
