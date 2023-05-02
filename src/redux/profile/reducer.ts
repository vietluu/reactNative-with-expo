import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils'
import { RootState } from '..'
const initialState = {
  data: [],
  isloading: false,
  haserr: false,
}

export const getProfile = createAsyncThunk('profile/get', async () => {
  const res: any = await api.get('/user/profile')
  if (res.status === 200) {
    return res.data
  }
  return res.data.json()
})

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.data = action.payload
        state.isloading = false
        state.haserr = false
      })
      .addCase(getProfile.rejected, (state) => {
        state.isloading = false
        state.haserr = true
      })
  },
})
export const profile = (state: RootState) => state.profileReducer.data

export default profileReducer.reducer
