import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from './notificationReducer'
import blogReducer from "./blogReducer"

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs:  blogReducer
  }
})

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

export default store