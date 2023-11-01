import notificationReducer from './notificationReducer'
import { invokeNotification, deprecateNotification } from './notificationReducer'
import { createStore } from 'redux'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  const store = createStore(notificationReducer) //initialState = [null, null]

  test('returns new state with action INVOKE_NOTIFICATION', () => {
    const state = [null, null]
    const action = {
      type: 'INVOKE_NOTIFICATION',
      payload: {
        message: 'welcome!',
        type: 'info'
      }
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual([action.payload.message, action.payload.type])
  })

  test('clears state with DEPRECATE_NOTIFICATION', () => {
    const state = ['welcome!', 'error']
    const action = {
      type: 'DEPRECATE_NOTIFICATION'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual([null, null]) //, state[2]
  })

  test('invokeNotification sets the message as wanted', () => {
    const currentState = store.getState()
    deepFreeze(currentState)

    store.dispatch(invokeNotification('test', 'error'))
    const endState = store.getState()

    expect(endState).toEqual(['test', 'error'])

  })

  test('deprecateNotification sets the state back to null', () => {
    const currentState = store.getState()
    deepFreeze(currentState)

    store.dispatch(deprecateNotification())
    const endState = store.getState()

    expect(endState).toEqual([null, null]) // currentState[1]

  })

  /** This still waiting for next gen solution
    test('setNotification works as expected', () => {
    const currentState = store.getState()
    deepFreeze(currentState)

    store.dispatch(setNotification('test', 5))
    const midState = store.getState()
    deepFreeze(midState)

    setTimeout(() => {
      const endState = store.getState()
    }, 5000)

    expect(endState).toEqual([null, currentState[1]])

  })
  */
})