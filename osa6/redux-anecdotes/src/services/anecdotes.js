import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
  const responseAnecdote = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToChange = responseAnecdote.data
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}

export default { getAll, createNew, updateVote }