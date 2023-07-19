import { createSlice } from '@reduxjs/toolkit'

const clothSlice = createSlice({
  name: 'cloth',
  initialState: {
    clothesList: [],
  },
  reducers: {
    setClothesList: (state, action) => {
      state.clothesList = action.payload
    },
    toggleFavorite: (state, action) => {
      const { index } = action.payload
      state.clothesList = state.clothesList.map((item, idx) =>
        idx === index ? { ...item, favorite: !item.favorite } : item
      )
    },
  },
})

export const { setClothesList, toggleFavorite } = clothSlice.actions
export default clothSlice.reducer
