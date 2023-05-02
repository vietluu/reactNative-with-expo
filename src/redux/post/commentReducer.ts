import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils'
import { RootState } from '..'
const initialState = {
  commentData: [],
  isloading: false,
  haserr: false,
}

// loadData comment
export const loadComments = createAsyncThunk('comment/loadcomment', async (body: any) => {
  const res: any = await api.post(`/comment/find`, body)
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

// add New comment
export const addNewComment = createAsyncThunk('comment/addNewcomment', async (body) => {
  const response: any = await api.post('/comment', body)
  if (response.status == 200 || response.status === 201) {
    return await response.data
  }
  return await response.json()
})

//delete comment
export const commentDeletes = createAsyncThunk('comment/delete', async (body) => {
  const res: any = await api.delete(`/comment/${body}`)
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

const CommentReducer = createSlice({
  initialState,
  name: 'comment',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewComment.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.commentData = action.payload
        state.isloading = false
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
      .addCase(loadComments.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.commentData = action.payload
        state.isloading = false
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
  },
})

export const {} = CommentReducer.actions

export const commentData = (state: RootState) => state.commentReducer.commentData

export const isloading = (state: RootState) => state.commentReducer.isloading
export default CommentReducer.reducer
