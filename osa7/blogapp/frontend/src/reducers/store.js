import { createStore } from 'redux'

import notificationReducer from './notificationReducer'

const store = createStore(notificationReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

export default store