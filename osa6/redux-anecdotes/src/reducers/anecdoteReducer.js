import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteIncrement(state, action) {
      const changedAnecdote = action.payload
      console.log(changedAnecdote)
      const id = changedAnecdote.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
        ).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteIncrement, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.updateVote(id)
    dispatch(voteIncrement(changedAnecdote))
  }
}

export default anecdoteSlice.reducer
