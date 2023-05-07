import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils'
import { RootState } from '..'

const initialState = {
  postBookMark: [],
  postData: [],
  isloading: false,
  haserr: false,
}

// loadData Post
export const loadPosts = createAsyncThunk('post/load', async () => {
  const options = {
    options: {
      relations: [
        // 'comments',
        'medias',
        'category',
      ], // join to get comments and medias
      order: {
        // order new post to top
        created_at: 'DESC',
      },
    },
  }

  const res: any = await api.post('/post/find', options)

  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

export const getOnePost = createAsyncThunk('post/getOne', async (id: number) => {
  if (!id) return null

  const res: any = await api.get(`/post/${id}`)

  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

// add New Post
export const addNewPost = createAsyncThunk('post/create', async (body: any) => {
  const res: any = await api.post('/post', body)
  if (res.status == 200 || res.status === 201) {
    return await res.data
  }
  return await res.json()
})
export const likePost = createAsyncThunk('post/like', async (body: any) => {
  const res: any = await api.post('/post/like', body)
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

// loadSave Post
export const loadSavePosts = createAsyncThunk('post/loadSave', async () => {
  const options = {
    options: {
      relations: ['medias'],
      order: {
        created_at: 'DESC',
      },
    },
    query: {
      post_user: {
        is_save: true,
      },
    },
  }

  const res: any = await api.post('/post/find', options)
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
      .addCase(loadSavePosts.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(loadSavePosts.fulfilled, (state, action) => {
        state.postBookMark = action.payload
        state.isloading = false
      })
      .addCase(loadSavePosts.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
  },
})

export const {} = PostReducer.actions

export const postData = (state: RootState) => state.postReducer.postData
export const postBookMark = (state: RootState) => state.postReducer.postBookMark
export const isloading = (state: RootState) => state.postReducer.isloading
export const haserr = (state: RootState) => state.postReducer.haserr

export default PostReducer.reducer
