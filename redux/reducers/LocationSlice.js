import { createSlice } from '@reduxjs/toolkit';

let id = 0;

export const locationSlice = createSlice({
  name: 'locations',
  initialState: {
    location_list: [],
  },
  reducers: {
    addLocationData: (state, action) => {
      state.location_list = [...state.location_list, {id: ++id, task: action.payload.task}];
    },
    deleteTodo: (state, action) => {
      state.location_list = [...state.location_list.filter(todo => todo.id != action.payload)];
    },
  },
});

export const { addLocationData, deleteTodo } = locationSlice.actions;

export const selectLocations = state => state.location_list;

export default locationSlice.reducer;
