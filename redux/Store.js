import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/RootReducer'
import GlobalStatesReducer from './reducers/GlobalStatesReducer'

const Store1 = configureStore({
  reducer: {
    location: GlobalStatesReducer,
  },
})

// const Store = configureStore({
//   reducer: rootReducer
// })

export default Store1
