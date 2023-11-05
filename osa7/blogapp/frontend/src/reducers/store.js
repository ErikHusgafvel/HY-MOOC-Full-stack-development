//npm install @reduxjs/toolkit

// import { createStore } from 'redux'
import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from './notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

export default store