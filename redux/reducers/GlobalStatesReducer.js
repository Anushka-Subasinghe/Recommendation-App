import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: '',
    locations:{}
  }

  const GlobalStatesReducer = createSlice({
    name: 'location',
    initialState,
    reducers: {
      setLocationAction: (state, action) => {
        state.locations = action.payload
      },
    },
  })
  
  export const { setLocationAction } = GlobalStatesReducer.actions
  export default GlobalStatesReducer.reducer
  