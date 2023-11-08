import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from './notificationReducer'
import blogReducer from "./blogReducer"
import userReducer from "./userReducer"

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs:  blogReducer,
    users: userReducer
  }
})

/** Print all changes to console
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
*/

export default store