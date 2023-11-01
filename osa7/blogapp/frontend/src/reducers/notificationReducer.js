const notificationReducer = (state = [null, null], action) => {
  console.log('here')
  switch (action.type) {
    case 'INVOKE_NOTIFICATION':
      const content = action.payload.message
      const type = action.payload.type
      //const timeoutID = action.payload.timeoutID
      //clearTimeout(state[2])
      return [content, type] //, timeoutID]
    case 'DEPRECATE_NOTIFICATION':
      return [null, null] //, state[2]]
    default: return state
  }
}

const generateTimeoutID = () =>
  Number((Math.random() * 100000).toFixed(0))

export const invokeNotification = (message, type) => {
  return {
    type: 'INVOKE_NOTIFICATION',
    payload: {
      message: message,
      type: type
      //timeoutID: generateTimeoutID()
    }
  }
}

export const deprecateNotification = () => {
  return {
    type: 'DEPRECATE_NOTIFICATION'
  }
}

/** This still waiting for next gen solution
export const setNotification = (message, seconds) =>
dispatch => {
  const timeoutID = setTimeout(() => {
    dispatch({
      type: 'DEPRECATE_NOTIFICATION'
    })
  }, seconds * 1000)
  dispatch({
    type: 'INVOKE_NOTIFICATION',
    payload: {
      message: message,
      timeoutID: timeoutID
    }})
}
 */
export default notificationReducer