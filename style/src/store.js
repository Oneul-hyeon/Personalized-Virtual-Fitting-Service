import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlices'
import clothReducer from './features/clothSlice'
import forumsReducer from './features/forumsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cloth: clothReducer,
    forums: forumsReducer,
  },
})

export default store
