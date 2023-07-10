import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../api/apiConfig'
import axios from 'axios'

const client = `${API_URL}/api/outfitforums`

export const fetchForums = createAsyncThunk(
  'forums/fetchForums',
  async (searchQuery) => {
    const response = await axios.get(client, { params: searchQuery })
    return response.data
  }
)

export const createForumPost = createAsyncThunk(
  'forums/createForumPost',
  async (newPost) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user._id
    const { title, content, image } = newPost

    const formData = new FormData()
    formData.append('user', userId)
    formData.append('title', title)
    formData.append('content', content)
    if (image) formData.append('image', image)

    const response = await axios.post(client, formData)
    return response.data
  }
)

const initialState = {
  forums: [],
  status: 'idle',
  error: null,
}

const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForums.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.forums = action.payload
      })
      .addCase(fetchForums.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

    builder
      .addCase(createForumPost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createForumPost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.forums.push(action.payload)
      })
      .addCase(createForumPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default forumsSlice.reducer
