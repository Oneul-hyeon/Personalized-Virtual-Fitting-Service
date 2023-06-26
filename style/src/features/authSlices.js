import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    updateUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { login, logout, updateUser } = authSlice.actions

export default authSlice.reducer
