import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    invokeNotification(state, action) {
      const content = action.payload
      return content
    },
    deprecateNotification(state, action) {
      return null
    }
  }
})

export const { invokeNotification, deprecateNotification } = notificationSlice.actions
export default notificationSlice.reducer