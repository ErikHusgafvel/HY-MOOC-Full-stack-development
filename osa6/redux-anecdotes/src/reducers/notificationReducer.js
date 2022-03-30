import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [ null, null ], // [ message, timeoutID ]
  reducers: {
    invokeNotification(state, action) {
      const content = action.payload.message
      const timeoutID = action.payload.timeoutID
      clearTimeout(state[1]) // silent error if clearTimeout(state[1]) evaluates to undefined
      return [content, timeoutID]
    },
    deprecateNotification(state, action) {
      return [null, state[1]]
    }
  }
})

export const { invokeNotification, deprecateNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch(deprecateNotification())
    }, seconds * 1000)
    dispatch(invokeNotification({ message, timeoutID }))
  }
}

export default notificationSlice.reducer