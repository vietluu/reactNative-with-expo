import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils'
import { RootState } from '..'

const initialState = {
  postData: [],
  isloading: false,
  haserr: false,
}

// loadData Post
export const loadPosts = createAsyncThunk('post/load', async () => {
  const options = {
    options: {
      relations: ['comments', 'medias'], // join to get comments and medias
      order: {
        // order new post to top
        created_at: 'DESC',
      },
    },
  }

  const res: any = await api.post('/post/find', options)

  console.log(res.data[0])
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

// add New Post
export const addNewPost = createAsyncThunk('post/create', async (body) => {
  const res: any = await api.post('/post', body)
  if (res.status == 200 || res.status === 201) {
    return await res.data
  }
  return await res.json()
})

//delete Post
export const postDeletes = createAsyncThunk('post/delete', async (body) => {
  const res: any = await api.delete(`/post/${body}`)
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

export const postUpdate = createAsyncThunk('post/update', async (body) => {
  const res: any = await api.put(`/post`, body)
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

const PostReducer = createSlice({
  initialState,
  name: 'post',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.postData = action.payload
        state.isloading = false
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
      .addCase(loadPosts.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.postData = action.payload
        state.isloading = false
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
  },
})

export const {} = PostReducer.actions

export const postData = (state: RootState) => state.postReducer.postData
export const isloading = (state: RootState) => state.postReducer.isloading
export const haserr = (state: RootState) => state.postReducer.haserr

export default PostReducer.reducer
